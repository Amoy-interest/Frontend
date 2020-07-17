import {mockUrl, APIModules} from "../utils/constants";
import {postRequest_json} from "../utils/ajax";
import {store} from "../redux/configureStore";
import {setToken, setUser} from "../redux/actions";
// import {message} from "antd";
import {history} from "../utils/histories";

export const login = (data, callback) => {
    console.log(data);
    const url = `${mockUrl}${APIModules.USER}/login`;
    postRequest_json(url, data, callback);
};
