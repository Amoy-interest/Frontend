import {APIModules, apiUrl} from "../utils/constants";
import {getRequest, postRequest_json, putRequest_json} from "../utils/ajax";

export const getHotList = (callback) => {
    const url = `${apiUrl}${APIModules.TOPIC}/hotList`;
    getRequest(url,null,callback);
};

export const getTopic = (name,callback) => {
    let param={topic_name:name};
    const url = `${apiUrl}${APIModules.TOPIC}`;
    getRequest(url,param,callback);
};

export const getTopicPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.TOPIC}/blogs`;
    getRequest(url,params,callback);
};

export const editTopic = (data,callback) => {
    const url = `${apiUrl}${APIModules.TOPIC}`;
    putRequest_json(url,null,data,callback);
};

export const reportTopic = (data,callback) => {
    const url = `${apiUrl}${APIModules.TOPIC}/report`;
    postRequest_json(url,data,null,callback);
};

