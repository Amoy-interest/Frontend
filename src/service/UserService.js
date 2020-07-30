import {localUrl, apiUrl, APIModules, MsgType, MessageType} from "../utils/constants";
import {getRequest, postRequest_json} from "../utils/ajax";
import {store} from "../redux/configureStore";
import {removeToken, removeUser} from "../redux/actions";
import PubSub from "pubsub-js";

export const login = (data, callback) => {
    console.log(data);
    const url = `${apiUrl}${APIModules.USER}/login`;

    postRequest_json(url, null, data, callback);
};

export const logout = () => {
    const url = `${apiUrl}${APIModules.USER}/logout`;
    getRequest(url, null, (data) => {
        if (data.status !== 200) {
            PubSub.publish(MsgType.SET_MESSAGE, {text: "登出失败！", type: MessageType.ERROR});
            return;
        }
        PubSub.publish(MsgType.SET_MESSAGE, { text: "登出成功！", type: MessageType.SUCCESS});
        store.dispatch(removeToken());
        store.dispatch(removeUser());
    });
};

export const register = (data, callback) => {
    const url = `${apiUrl}${APIModules.USER}/register`;
    postRequest_json(url,null, data, callback);
};

export const loadMore = (pageSize, pageIndex, callback) => {
    const url = `${apiUrl}/test/loadMore`
    const json = {
        pageSize: pageSize,
        pageIndex: pageIndex
    };

    postRequest_json(url, null,json, callback);
};

export const follow = (id, callback) => {
    const data = {follow_id:id};
    const url = `${apiUrl}${APIModules.USER}/follow?follow_id=${id}`;
    postRequest_json(url,null, data, callback);
};

export const unfollow = (id, callback) => {
    const data = {follow_id:id};
    const url = `${apiUrl}${APIModules.USER}/unfollow?follow_id=${id}`;
    postRequest_json(url, null,data, callback);
};

export const getUserInfo = (id, callback) => {
    const data = {user_id:id};
    const url = `${apiUrl}${APIModules.USER}`;
    getRequest(url, data, callback);
};

export const getFans = (params, callback) => {
    const url = `${apiUrl}${APIModules.USER}/fans`;
    getRequest(url, params, callback);
};

export const getFollows = (params, callback) => {
    const url = `${apiUrl}${APIModules.USER}/follow`;
    getRequest(url, params, callback);
};

