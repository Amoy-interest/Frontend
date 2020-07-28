import {apiUrl, APIModules} from "../utils/constants";
import {deleteRequest_json, getRequest, postRequest_json, putRequest_json} from "../utils/ajax";

export const makePost = (text, images, callback) => {
    const url = `${apiUrl}${APIModules.BLOG}`;
    const params = {
        text: text,
        images: images,
        topic_id: 0,
        user_id: 0
    };
    console.log("params", params);
    postRequest_json(url, params, callback);
};

function upload (file, oss) {
    return new Promise(function(resolve, reject) {
        let key = `${oss.dir}/${file.name}`;
        let opts = {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'origin': oss.host,
                // 'Access-Control-Request-Headers':'xxx'
            },
            body: {
                policy: oss.policy,
                signature: oss.signature,
                key: key,
                ossaccessKeyId: oss.accessKeyId,
                dir: oss.dir,
                host: oss.host,
                callback: null,
                file: file.base64
            },
            // 'mode': 'no-cors'
        };

        // resolve(opts);
        console.log(opts);

        fetch(oss.host,opts)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                resolve(data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })

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

export const deletePost=(id, callback) => {
    const params = {blog_id: id};
    console.log(params);
    const url = `${apiUrl}${APIModules.BLOG}?blog_id=${id}`;
    deleteRequest_json(url, null, callback);
};

export const editPost=(data,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}`;
    putRequest_json(url,data,callback);
};

export const reportPost=(id,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/report?blog_id=${id}`;
    postRequest_json(url, null, callback);
};

export const searchPosts=(params,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}/search`;
    getRequest(url,params,callback);
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
    console.log(params);
    getRequest(url,params,callback);
};

export const getFollowPosts = (params,callback) => {
    console.log("executing getFollowPosts");
    console.log(params);
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
    console.log(params);
    getRequest(url,params,callback);
};

export const getMultiLevelComments=(params,callback)=>{
    const url = `${apiUrl}${APIModules.BLOG}${APIModules.COMMENTS}/multilevel`;
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
