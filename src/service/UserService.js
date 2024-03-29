import {apiUrl, APIModules} from "../utils/constants";
import {getRequest, postRequest_json} from "../utils/ajax";
import {store} from "../redux/configureStore";
import {removeToken, removeUser} from "../redux/actions";

export const login = (data, callback) => {
    console.log(data);
    const url = `${apiUrl}${APIModules.USER}/login`;
    postRequest_json(url, data, callback);
};

export const logout = () => {
    console.log("logout");
    const url = `${apiUrl}${APIModules.USER}/logout`;

    const callback = () => {
        console.log("logout callback");
        store.dispatch(removeToken());
        store.dispatch(removeUser());
    };
    getRequest(url, null, callback);
};

export const register = (formData, callback) => {
    console.log(formData);

    const url = `${apiUrl}${APIModules.USER}/register`;
    postRequest_json(url, formData, callback);
};

export const loadMore = (pageSize, pageIndex, callback) => {
    const url = `${apiUrl}/test/loadMore`
    const json = {
        pageSize: pageSize,
        pageIndex: pageIndex
    }

    postRequest_json(url, json, callback);
}
