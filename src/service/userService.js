import {mockUrl, APIModules} from "../utils/constants";
import {postRequest_json} from "../utils/ajax";

export const login = (data, callback) => {
    console.log(data);
    const url = `${mockUrl}${APIModules.USER}/login`;
    postRequest_json(url, data, callback);
};

export const register = (formData, callback) => {
    console.log(formData);
    let data = {
        registerDTO: formData,
    }

    const url = `${mockUrl}${APIModules.USER}/register`;
    postRequest_json(url, data, callback);
};
