import {mockUrl, APIModules} from "../utils/constants";
import {postRequest_json} from "../utils/ajax";
import {store} from "../redux/configureStore";
import {setToken, setUser} from "../redux/actions";
// import {message} from "antd";
import {history} from "../utils/histories";

export const login = (data) => {
    console.log(data);
    const url = `${mockUrl}${APIModules.USER}/login`;
    const callback = (data) => {
        console.log(data);
        if (data.status !== 200) {
            // message.error(data.msg);
            return;
        }

        // message.success(data.msg)
        store.dispatch(setUser(data.data.user));
        store.dispatch(setToken(data.data.token));
        history.push('/home')
        history.go(0);
    };
    postRequest_json(url, data, callback);
};
