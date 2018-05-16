'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
  baseURL: '/api',
  timeout: 10 * 1000
}; /**
    * 基于axios统一的简易配置
    * https://github.com/axios/axios
    */

var Fetch = _axios2.default.create(defaultConfig);
// axios 引用
Fetch.axios = _axios2.default;
// Fetch.interceptors.request.use(function (config) {
// 	console.log(config)
// 	return config;
// }, function (error) {
// 	return Promise.reject(error);
// });
// Fetch.interceptors.response.use(function (response) {
// 	console.log(response, axios)
// 	return response;
// }, function (error) {
// 	return Promise.reject(error);
// });
exports.default = Fetch;