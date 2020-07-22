import {apiUrl, APIModules} from "../utils/constants";
import {getRequest, putRequest_json, postRequest_json, deleteRequest_json} from "../utils/ajax";

export const getSensWords = (data, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}${data}`;
    getRequest(url, callback);
};

export const putSensWord = (data, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}${data}`;
    putRequest_json(url, null, callback);
};

export const postSensWord = (data, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}${data}`;
    postRequest_json(url, null, callback);
};

export const deleteSensWord = (data, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}${data}`;
    deleteRequest_json(url, null, callback);
};
