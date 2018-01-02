/**
 * 基于axios统一的简易配置
 * https://github.com/axios/axios
 */
import axios from 'axios'

let defaultConfig = {
	baseURL: '/api',
	timeout: 10 * 1000
}
const Fetch = axios.create(defaultConfig)
// axios 引用
Fetch.axios = axios;
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
export default Fetch