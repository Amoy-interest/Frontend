import {apiUrl, APIModules} from "../utils/constants";
import {getRequest, putRequest_json, postRequest_json, deleteRequest_json} from "../utils/ajax";

export const getReportedPosts = (callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.BLOG}/reported/?pageNum=0&pageSize=20`;
    getRequest(url, callback);
};

export const getReportedUsers = (callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/reported/?pageNum=0&pageSize=20`;
    getRequest(url, callback);
};

export const getReportedTopics = (callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.TOPIC}/reported/?pageNum=0&pageSize=20`;
    getRequest(url, callback);
};

export const checkReportedTopic = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.TOPIC}/reported/?pageNum=0&pageSize=20`;
    putRequest_json(url, data, callback);
};

export const banReportedUser = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/ban`;
    putRequest_json(url, data, callback);
};

export const forbidReportedUser = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/forbid`;
    putRequest_json(url, data, callback);
};









