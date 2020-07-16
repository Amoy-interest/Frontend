import {mockUrl} from "../utils/constants";
import {postRequest_json} from "../utils/ajax";

const USER = '/user';

export const login = (data) => {
    console.log(data);
    const url = `${mockUrl}${USER}/login`;
    const callback = (data) => {
        console.log(data);
    };
    postRequest_json(url, data, callback);
};
