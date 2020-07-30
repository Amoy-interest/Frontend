import {localUrl, APIModules, MsgType} from "../utils/constants";
import {getRequest} from "../utils/ajax";
import OSS from 'ali-oss';
import {nlNL} from "@material-ui/core/locale";
import PubSub from "pubsub-js";

function getSTS() {
    return new Promise(function(resolve, reject) {
        const url = `${localUrl}${APIModules.ALI}/sts/oss/tokens`;
        getRequest(url, null, (data) =>{
            console.log(data)
            if (data.status === 200) resolve(
                new OSS({
                    region: data.data.region,
                    accessKeyId: data.data.accessKeyId,
                    accessKeySecret: data.data.accessKeySecret,
                    stsToken: data.data.securityToken,
                    bucket: data.data.bucket
            }));
            else {
                reject(data);
            }
        })
    })
};

function getPath(name) {
    let date = new Date();

    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    month = month.length === 1 ? "0" + month: month;
    day = day.length === 1 ? "0" + day: day;
    let dateString = year + month + day;

    let path = `amoy-interest/images/${dateString}/${date.getTime().toString()}-${name}`;
    return path;
}

function errorUpload (msg) {
    PubSub.publish(MsgType.ERROR_UPLOAD, msg);
};

export default class OssApi {
    listObject = () => {
        return new Promise(async function(resolve, reject) {
            let oss = await getSTS();
            if(oss === null) reject(oss);
            let result = await oss.list();
            resolve(result);
        })
    };

    putObjects = (files) => {
        return new Promise(async function(resolve, reject) {
            let urls = [];
            let oss = null;

            // if there is no image, then no need oss
            if(files.length === 0) {
                resolve(urls);
                return;
            }

            try {
                oss = await getSTS();
            } catch (e) {
                console.log(e);
                errorUpload(e.msg);
                reject(e);
                return;
            }

            try {
                for (let i = 0; i < files.length; ++i){
                    let result = await oss.put(getPath(files[i].name), files[i]);
                    urls.push(result.url);
                }
            } catch (e) {
                console.log(e);
                errorUpload("上传图片失败！");
                reject(e);
                return;
            }

            resolve(urls);
        })
    };

    getPolicy = (callback) => {
        const url = `${localUrl}${APIModules.ALI}/oss/policy`;
        getRequest(url, null, callback);
    };
}




