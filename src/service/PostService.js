import {apiUrl, APIModules} from "../utils/constants";
import {deleteRequest_json, getRequest, postRequest_json} from "../utils/ajax";

export const getPost=(id,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/?${id}`;
    getRequest(url,callback);
};

export const getRecommendPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/recommend`;
    getRequest(url,params,callback);
};

export const getRandomPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/beforeLogin`;
    getRequest(url,params,callback);
};

export const getOwnPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/own`;
    getRequest(url,params,callback);
};

export const getFollowPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/follow`;
    getRequest(url, params,callback);
};

export const vote=(data,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/vote`;
    postRequest_json(url, data, callback);
};

export const cancelVote=(data,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/vote`;
    deleteRequest_json(url, data, callback);
};

export const getComments=(params,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}${APIModules.COMMENTS}/level1`;
    getRequest(url,params,callback);
};

export const postComment=(data,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/comments`;
    postRequest_json(url, data, callback);
};

export const deleteComment=(data,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/comments`;
    deleteRequest_json(url, data, callback);
};
