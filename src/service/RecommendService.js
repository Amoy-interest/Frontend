import {APIModules, apiUrl} from "../utils/constants";
import {getRequest} from "../utils/ajax";

export const getSimilarPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}${APIModules.SIM}`;
    getRequest(url, params, callback);
};
export const getSimilarUsers = (params, callback) => {
    const url = `${apiUrl}${APIModules.USER}${APIModules.SIM}`;
    getRequest(url, params, callback);
};
