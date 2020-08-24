import {apiUrl, APIModules} from "../utils/constants";
import {deleteRequest_json, getRequest, postRequest_json, putRequest_json} from "../utils/ajax";

export const makePost = (text, images, tag, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}`;
    const params = {
        text: text,
        images: images,
        topic_name: [tag],
        user_id: 0
    };
    postRequest_json(url, null, params, callback);
};

export const forwardPost = (reply_blog_id, text, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/forward`;
    const json = {
        reply_blog_id: reply_blog_id,
        text: text,
        // topic_id: topic_id
    };

    postRequest_json(url, null, json, callback);
};


export const getPost = (id, callback) => {
    const params = {blog_id: id};
    const url = `${apiUrl}${APIModules.BLOG}`;
    getRequest(url, params, callback);
};

export const deletePost = (id, callback) => {
    const query = {blog_id: id};
    const url = `${apiUrl}${APIModules.BLOG}`;
    deleteRequest_json(url, query, null, callback);
};

export const editPost = (data, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}`;
    putRequest_json(url, null, data, callback);
};

export const reportPost = (id, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/report?blog_id=${id}`;
    postRequest_json(url, null, null, callback);
};

export const searchPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/search`;
    getRequest(url, params, callback);
};

export const getRecommendPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/recommend`;
    getRequest(url, params, callback);
};

export const getRandomPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/beforeLogin`;
    getRequest(url, params, callback);
};

export const getOwnPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/users`;
    getRequest(url, params, callback);
};

export const getFollowPosts = (params, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/follow`;
    getRequest(url, params, callback);
};

export const vote = (data, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/vote`;
    console.log("vote");
    postRequest_json(url, null, data, callback);
};

export const cancelVote = (data, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/vote`;
    deleteRequest_json(url, null, data, callback);
};

export const getComments = (params, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}${APIModules.COMMENTS}/level1`;
    getRequest(url, params, callback);
};

export const getMultiLevelComments = (params, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}${APIModules.COMMENTS}/multilevel`;
    getRequest(url, params, callback);
};

export const postComment = (data, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/comments`;
    postRequest_json(url, null, data, callback);
};

export const deleteComment = (data, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}/comments`;
    deleteRequest_json(url, data, null, callback);
};
