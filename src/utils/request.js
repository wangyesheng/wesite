import Vue from "vue";
import axios from "axios";
import { Notification } from "element-ui";
import { getToken } from "./auth";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
});

let currentUrl;
// request interceptor
service.interceptors.request.use(
  config => {
    currentUrl = config.url;
    const token = getToken();
    token && (config.headers["Authorization"] = `Bearer ${token}`);
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const {
      status,
      statusText,
      data: { status: code, message, data }
    } = response;
    if (currentUrl.includes("member/very-token")) {
      return {
        code,
        message,
        data
      };
    } else if (status !== 200 || code !== 0) {
      Notification({
        title: "提示",
        type: "warning",
        duration: 5 * 1000,
        message: message || statusText || "服务器繁忙，请稍后再试！"
      });
      return Promise.reject(
        new Error(statusText || "服务器繁忙，请稍后再试！")
      );
    } else {
      return data;
    }
  },
  error => {
    console.log("err", error.response); // for debug
    return Promise.reject(error);
  }
);

Vue.prototype.$get = (url, params) =>
  service({
    url,
    method: "get",
    params
  });

Vue.prototype.$post = (url, data) =>
  service({
    url,
    method: "post",
    data
  });

Vue.prototype.$put = (url, data) =>
  service({
    url,
    method: "put",
    data
  });

Vue.prototype.$delete = (url, params) =>
  service({
    url,
    method: "delete",
    params
  });

export default service;
