import {apiUrl, APIModules} from "../utils/constants";
import {getRequest, putRequest_json, postRequest_json, deleteRequest_json} from "../utils/ajax";

export const getSensWords = (params, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}`;
    getRequest(url, params, callback);
};

export const updateSensWord = (oldWord, newWord, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}`;
    const json = {
        oldWord: oldWord,
        newWord: newWord
    };
    putRequest_json(url, null, json, callback);
};

export const addSensWord = (keyword, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}`;
    const json = {
        keyword: keyword
    };
    postRequest_json(url, null, json, callback);
};

export const deleteSensWord = (keyword, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}`;
    const json = {
        keyword: keyword
    };
    deleteRequest_json(url, null, json, callback);
};

export const searchSensWords = (params, callback) => {
    const url = `${apiUrl}${APIModules.SENSITIVEWORD}/search`;
    getRequest(url, params, callback);
};
