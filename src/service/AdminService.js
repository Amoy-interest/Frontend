import {apiUrl, APIModules} from "../utils/constants";
import {getRequest, putRequest_json, deleteRequest_json, postRequest_json} from "../utils/ajax";

export const getReportedPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.BLOG}/reported/`;
    getRequest(url, params, callback);
};

export const searchReportedPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.BLOG}/reported/search`;
    getRequest(url, params, callback);
};

export const getReportedUsers = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/reported/`;
    getRequest(url, params, callback);
};

export const searchReportedUsers = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/reported/search`;
    getRequest(url, params, callback);
};

export const getReportedTopics = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.TOPIC}/reported/`;
    getRequest(url, params, callback);
};

export const searchReportedTopics = (params, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.TOPIC}/reported/search`;
    getRequest(url, params, callback);
};

export const checkReportedTopic = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.TOPIC}/reported/`;
    putRequest_json(url,null,  data, callback);
};

export const checkReportedBlog = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.BLOG}/reported/`;
    putRequest_json(url, null, data, callback);
};

export const banReportedUser = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/ban`;
    putRequest_json(url, null, data, callback);
};

export const forbidReportedUser = (data, callback) => {
    const url = `${apiUrl}${APIModules.ADMIN}${APIModules.USER}/forbid`;
    putRequest_json(url, null, data, callback);
};

export const editSenseWord = (data, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}`;
    putRequest_json(url, null, data, callback);
};

export const deleteSenseWord = (data, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}`;
    deleteRequest_json(url, null, data, callback);
};

export const addSenseWord = (data, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}`;
    postRequest_json(url, null, data, callback);
};







