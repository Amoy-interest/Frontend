import {apiUrl, APIModules} from "../utils/constants";
import {deleteRequest_json, getRequest, postRequest_json} from "../utils/ajax";

export const makePost = (text, images, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}`;
    const params = {
        BlogContentDto: {
            text: text,
            images: images
        }
    };
    console.log("params", params);
    postRequest_json(url, params, callback);
};

export const forwardPost = (reply_blog_id, text, topic_id, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/forward`;
    const json = {
        reply_blog_id: reply_blog_id,
        text: text,
        topic_id: topic_id
    };

    postRequest_json(url, json, callback);
};

export const getPost = (id, callback) => {
    const params = {blog_id: id};
    const url = `${apiUrl}${APIModules.BLOG}`;
    getRequest(url, params, callback);
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
    const url = `${apiUrl}${APIModules.BLOG}/users`;
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
