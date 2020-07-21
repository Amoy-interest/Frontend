import {apiUrl, APIModules} from "../utils/constants";
import {deleteRequest_json, getRequest, postRequest_json} from "../utils/ajax";

export const getRecommendPosts = (callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/recommend`;
    getRequest(url, callback);
};

export const getRandomPosts = (callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/beforeLogin`;
    getRequest(url, callback);
};

export const getOwnPosts = (callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/own`;
    getRequest(url, callback);
};

export const getFollowPosts = (callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/follow`;
    getRequest(url, callback);
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
