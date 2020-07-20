import {apiUrl, mockUrl, APIModules} from "../utils/constants";
import {getRequest} from "../utils/ajax";

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
