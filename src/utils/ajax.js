// import {message} from 'antd';
import {store} from "../redux/configureStore";

// post form data
let postRequest_form = (url, data, callback) => {
    let formData = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "POST",
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

// post json data
let postRequest_json = (url, json, callback) => {

    let opts = {
        method: "POST",
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

// get form data
let getRequest_form = (url, data, callback) => {
    let formData = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "GET",
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

// get json data
let getRequest_json = (url,callback) => {

    let opts = {
        method: "GET",
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

// put json data
let putRequest_json = (url, json, callback) => {

    let opts = {
        method: "PUT",
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

// delete json data
let deleteRequest_json = (url, json, callback) => {

    let opts = {
        method: "DELETE",
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

export {postRequest_form, postRequest_json,
    getRequest_form, getRequest_json,
    putRequest_json, deleteRequest_json
};
