import {mockUrl, APIModules} from "../utils/constants";
import {postRequest_json} from "../utils/ajax";

export const login = (data) => {
    console.log(data);
    const url = `${mockUrl}${APIModules.USER}/login`;
    const callback = (data) => {
        console.log(data);
    };
    postRequest_json(url, data, callback);
};
