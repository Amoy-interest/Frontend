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

export const editTopicIntro = (data,callback) => {
    const url = `${apiUrl}${APIModules.TOPIC}/intro`;
    putRequest_json(url,null,data,callback);
};

export const editTopicLogo = (data,callback) => {
    const url = `${apiUrl}${APIModules.TOPIC}/logo`;
    putRequest_json(url,null,data,callback);
};

export const reportTopic = (data,callback) => {
    const url = `${apiUrl}${APIModules.TOPIC}/logo`;
    postRequest_json(url,null,data,callback);
};

