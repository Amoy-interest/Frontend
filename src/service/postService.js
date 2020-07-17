import {mockUrl, APIModules} from "../utils/constants";
import {getRequest_json} from "../utils/ajax";

export const getRecommendPosts = (callback) => {
    const url = `${mockUrl}${APIModules.BLOG}/recommend`;
    getRequest_json(url, callback);
};

export const getRandomPosts = (callback) => {
    const url = `${mockUrl}${APIModules.BLOG}/beforeLogin`;
    getRequest_json(url, callback);
};

export const getOwnPosts = (callback) => {
    const url = `${mockUrl}${APIModules.BLOG}/own`;
    getRequest_json(url, callback);
};

export const getFollowPosts = (callback) => {
    const url = `${mockUrl}${APIModules.BLOG}/follow`;
    getRequest_json(url, callback);
};
