import {localUrl, apiUrl, APIModules} from "../utils/constants";
import {getRequest, postRequest_json} from "../utils/ajax";
import {store} from "../redux/configureStore";
import {removeToken, removeUser} from "../redux/actions";

export const login = (data, callback) => {
    console.log(data);
    const url = `${localUrl}${APIModules.USER}/login`;
    postRequest_json(url, data, callback);
};

export const logout = () => {
    console.log("logout");
    const url = `${localUrl}${APIModules.USER}/logout`;

    const callback = () => {
        console.log("logout callback");
        store.dispatch(removeToken());
        store.dispatch(removeUser());
    };
    getRequest(url, null, callback);
};

export const register = (data, callback) => {
    console.log(data);

    const url = `${localUrl}${APIModules.USER}/register`;
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
    const url = `${apiUrl}${APIModules.USER}/follow`;
    postRequest_json(url, data, callback);
};

export const unfollow = (id, callback) => {
    const data = {follow_id:id};
    const url = `${apiUrl}${APIModules.USER}/unfollow`;
    postRequest_json(url, data, callback);
};

