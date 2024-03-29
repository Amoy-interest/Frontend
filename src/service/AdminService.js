import {apiUrl, APIModules} from "../utils/constants";
import {getRequest, putRequest_json, postRequest_json, deleteRequest_json} from "../utils/ajax";

export const getReportedPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.BLOG}/reported/`;
    getRequest(url, params, callback);
};

export const getReportedUsers = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/reported/`;
    getRequest(url, params, callback);
};

export const getReportedTopics = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.TOPIC}/reported/`;
    getRequest(url, params, callback);
};

export const checkReportedTopic = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.TOPIC}/reported/`;
    putRequest_json(url, data, callback);
};

export const checkReportedBlog = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.BLOG}/reported/`;
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









