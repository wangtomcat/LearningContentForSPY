import axios from "axios";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);

const http = axios.create({
  baseURL: "https://m.maizuo.com",
  timeout: 10000,
  headers: {
    "X-Client-Info":
      '{"a":"3000","ch":"1002","v":"5.0.4","e":"1637741551389678087798785","bc":"110100"}',
  },
});
// 发送请求之前拦截
http.interceptors.request.use(
  function (config) {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 发送请求之后拦截
http.interceptors.response.use(
  function (response) {
    Toast.clear();
    return response;
  },
  function (error) {
    Toast.clear();
    return Promise.reject(error);
  }
);
export default http;
