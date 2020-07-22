import {apiUrl, APIModules} from "../utils/constants";
import {deleteRequest_json, getRequest, postRequest_json} from "../utils/ajax";
export const getPost=(id,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/?${id}`;
    getRequest(url,callback);
};

export const getRecommendPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/recommend/old`;
    getRequest(url,params,callback);
};

export const getRandomPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/beforeLogin`;
    getRequest(url,params,callback);
};

export const getOwnPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/own/old`;
    getRequest(url,params,callback);
};

export const getFollowPosts = (params,callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/follow/old`;
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

export const postComment=(data,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/comments`;
    postRequest_json(url, data, callback);
};

export const deleteComment=(data,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/comments`;
    deleteRequest_json(url, data, callback);
};
