import {mockUrl, APIModules} from "../utils/constants";
import {getRequest} from "../utils/ajax";

export const getRecommendPosts = (callback) => {
    const url = `${mockUrl}${APIModules.BLOG}/recommend`;
    getRequest(url, callback);
};

export const getRandomPosts = (callback) => {
    const url = `${mockUrl}${APIModules.BLOG}/beforeLogin`;
    getRequest(url, callback);
};

export const getOwnPosts = (callback) => {
    const url = `${mockUrl}${APIModules.BLOG}/own`;
    getRequest(url, callback);
};

export const getFollowPosts = (callback) => {
    const url = `${mockUrl}${APIModules.BLOG}/follow`;
    getRequest(url, callback);
};
