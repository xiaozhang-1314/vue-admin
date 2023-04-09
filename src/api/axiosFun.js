import axios from 'axios';
import { isPlainObject } from "lodash-es";
// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};
// 通用公用方法
const req = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};
let ajaxTool = {
    JsonToSearchParams(params){
        if (isPlainObject(params)) {
            const formData = new URLSearchParams();
            for (let key in params) {
                let value = params[key];
                formData.append(key, value);
            }
            return formData;
        } else {
            throw new Error("the param is a plain Object");
        }
    },
    JsonToFormData(params){
        if (isPlainObject(params)) {
            const formData = new FormData();
            for (let key in params) {
                let value = params[key];
                formData.append(key, value);
            }
            return formData;
        } else {
            throw new Error("the param is a plain Object");
        }
    },
    serializeUrl(url, params) {
        if (!url) { throw new Error("the first param is url") };
        if (!url.includes("?")) { url += "?" };
        if (isPlainObject(params)) {
            for (let key in params) {
                let value = params[key];
                if (url.endsWith("?")) {
                    url += `${key}=${value}`;
                } else {
                    url += `&${key}=${value}`;
                }
            }
        } else {
            throw new Error("the second param is a plain Object");
        }
        return url;
    },
    checkStatus(response) {
        if (response.status >= 0 && response.status >= 200 && response.status < 500) {
            return response
        }
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error)
    },
    checkCode(response) {
        //console.log('response',response)
        let { status,data,msg,result,message,resultCode,t,resultMsg,success,obj,ret, curDatetime,createUser } = response;
        let _status = status != undefined ? status : (resultCode != undefined ? resultCode : ret);
        if(success == false){
            return response
        }
        switch (_status/1) {
            case 701:
                // window.location.href = "";
                return Promise.reject(response);
            case 200:
                return Promise.resolve({ _status, data, msg,curDatetime,createUser });
                // return Promise.reject(response);
            case 0:
                return Promise.resolve({ _status, result, t,  message, resultMsg, obj });
                // return Promise.reject(response);
            default:
                // return Promise.reject({ _status, data, msg, resultMsg, success });
                return Promise.reject(response);
        }
    },
    parseJSON(response) {
        return response.json();
    }
}
    const get = (url, params = {})=> {
        url = ajaxTool.serializeUrl(url, params);
        url = `${url}${url.endsWith("?")?"":"&"}ran=${Math.random()}`;
        return fetch(url)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => { Promise.reject(err)
            });
    }
    const post = (url, params = {})=> {
        const options = {
            body: JSON.stringify(params),
            method: "POST",
            headers: {                
                // 'content-type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err));
    }
    const upload = (url, params = {})=> {
        const formData = params; //ajaxTool.JsonToFormData(params);
        const options = {
            body: formData,
            method: 'POST',
            // headers: {
            //     'content-type': 'multipart/form-data'
            // },
            credentials:'include'
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err));
    }
    const all = (promises)=> { 
        return Promise.all(promises);
    }
    const postFormData = (url, params = {})=> {
        const formData = ajaxTool.JsonToSearchParams(params);
        const options = {
            body: formData,
            method: 'POST',
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err));
    }



export {
    loginreq,
    req,
    get,
    post,
    upload,
    all,
    postFormData
}