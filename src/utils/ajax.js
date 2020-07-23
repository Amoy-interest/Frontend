// import {message} from 'antd';
import {store} from "../redux/configureStore";

const Request_form = (url, data, callback, method) => {
    let formData = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
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

    fetch(url,opts)
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

    let opts = {
        method: method,
        body: JSON.stringify(json),
        headers: {
            'token': store.getState().tokenReducer,
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    fetch(url,opts)
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

// post form data
const postRequest_form = (url, data, callback) => {
    Request_form(url, data, callback, 'POST');
};

// post json data
const postRequest_json = (url, json, callback) => {
    Request_json(url, json, callback, 'POST');
};

const getRequest = (url, params, callback) => {
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    let opts = {
        method: "GET",
        headers: {
            'token': store.getState().tokenReducer,
        },
        credentials: "include"
    };

    fetch(url,opts)
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

// put json data
const putRequest_json = (url, json, callback) => {
    Request_json(url, json, callback, 'PUT')
};

// delete json data
const deleteRequest_json = (url, json, callback) => {
    Request_json(url, json, callback, 'DELETE')
};

export {postRequest_form, postRequest_json, getRequest,
    putRequest_json, deleteRequest_json
};
