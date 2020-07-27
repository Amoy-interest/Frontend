import {localUrl, apiUrl, APIModules, MsgType} from "../utils/constants";
import {getRequest, postRequest_json} from "../utils/ajax";
import {store} from "../redux/configureStore";
import {removeToken, removeUser} from "../redux/actions";
import PubSub from "pubsub-js";

export const login = (data, callback) => {
    console.log(data);
    const url = `${apiUrl}${APIModules.USER}/login`;

    postRequest_json(url, data, callback);
};

export const logout = () => {
    console.log("logout");
    const url = `${apiUrl}${APIModules.USER}/logout`;

    const callback = (data) => {
        console.log("logout callback", data);
        if (data.status !== 0) {
            PubSub.publish(MsgType.SET_MESSAGE, {open: true, text: data.msg});
        }
        PubSub.publish(MsgType.SET_MESSAGE, {open: true, text: data.msg, type: 'success'});
        store.dispatch(removeToken());
        store.dispatch(removeUser());
    };
    getRequest(url, null, callback);
};

export const register = (data, callback) => {
    console.log(data);

    const url = `${apiUrl}${APIModules.USER}/register`;
    postRequest_json(url, data, callback);
};

export const loadMore = (pageSize, pageIndex, callback) => {
    const url = `${apiUrl}/test/loadMore`
    const json = {
        pageSize: pageSize,
        pageIndex: pageIndex
    };

    postRequest_json(url, json, callback);
};

export const follow = (id, callback) => {
    const data = {follow_id:id};
    console.log(data);
    const url = `${apiUrl}${APIModules.USER}/follow?follow_id=${id}`;
    postRequest_json(url, null, callback);
};

export const unfollow = (id, callback) => {
    const data = {follow_id:id};
    const url = `${apiUrl}${APIModules.USER}/unfollow?follow_id=${id}`;
    postRequest_json(url, null, callback);
};

export const getUserInfo = (id, callback) => {
    const data = {user_id:id};
    console.log(data);
    const url = `${apiUrl}${APIModules.USER}`;
    getRequest(url, data, callback);
};
