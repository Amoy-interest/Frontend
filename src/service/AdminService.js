import {apiUrl, APIModules} from "../utils/constants";
import {getRequest, putRequest_json, postRequest_json, deleteRequest_json} from "../utils/ajax";

export const getReportedPosts = (callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.BLOG}/reported`;
    getRequest(url, callback);
};

export const getReportedUsers = (callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/reported`;
    getRequest(url, callback);
};

export const getReportedTopics = (callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.TOPIC}/reported`;
    getRequest(url, callback);
};



