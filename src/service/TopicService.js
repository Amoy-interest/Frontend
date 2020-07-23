import {APIModules, apiUrl} from "../utils/constants";
import {getRequest} from "../utils/ajax";

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
