import {store} from "../redux/configureStore";
import {removeToken, removeUser, setToken} from "../redux/actions";
import PubSub from "pubsub-js";
import {MsgType} from "./constants";

function parseQuery(url, query) {
    if (query) {
        let paramsArray = [];
        Object.keys(query).forEach(key => paramsArray.push(key + '=' + query[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
        return url;
    } else return url;
};

const Request_form = (url, data, callback, method) => {
    let formData = new FormData();

    for (let p in data) {
        if (data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: method,
        body: formData,
        headers: {
            'token': store.getState().tokenReducer,
        },
        credentials: "include"
    };

    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

const Request_json = (url, json, callback, method) => {
    let needToken = !(url.match("/login") || url.match("/register")||url.match("/beforeLogin")||url.match("/hotList"));
    let needBody = !(method === 'GET');

    let opts = needBody ? {
        method: method,
        body: JSON.stringify(json),
        headers: needToken ? {
            'Authorization': store.getState().tokenReducer,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
        },
        //credentials: "include"
    } : {
        method: method,
        headers: needToken ?{
            'Authorization': store.getState().tokenReducer,
        }:{},
    };

    fetch(url, opts)
        .then((response) => {
            let token = response.headers.get('Authorization');
            //console.log(token);
            if (token) {
                store.dispatch(setToken(token));
            }
            return response.json()
        })
        .then((data) => {
            console.log(data);
            if (data.status === 401) {
                store.dispatch(removeToken());
                store.dispatch(removeUser());
                PubSub.publish(MsgType.SET_MESSAGE, {
                    open: true, text: data.msg, type: 'error'
                });
                return;
            }
            // else if (data.status !== 200) {
            //     PubSub.publish(MsgType.SET_MESSAGE, {
            //         open: true, text: data.msg, type: 'error'
            //     });
            //     // return;
            // }
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

// post json data
const postRequest_json = (url, query, json, callback) => {
    url = parseQuery(url, query);
    Request_json(url, json, callback, 'POST');
};

// get json data
const getRequest = (url, query, callback) => {
    url = parseQuery(url, query);
    Request_json(url, null, callback, 'GET');
};

// put json data
const putRequest_json = (url, query, json, callback) => {
    url = parseQuery(url, query);
    Request_json(url, json, callback, 'PUT');
};

// delete json data
const deleteRequest_json = (url, query, json, callback) => {
    url = parseQuery(url, query);
    Request_json(url, json, callback, 'DELETE');
};

export {
    postRequest_json, getRequest,
    putRequest_json, deleteRequest_json
};
