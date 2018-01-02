import { Fetch } from 'fego'
// 服务器渲染可以拦截
// Fetch.interceptors.request.use(function(config){
// 	return Promise.reject({
// 		serverHand: true
// 	})
// }, function(error){
// 	return Promise.reject(error)
// })
Fetch.interceptors.response.use(function (response) {
	const contentType = response.headers["content-type"];
	if(/json/.test(contentType)){
		const rs = response.data;
		// 兼容各项目组的风格
		let code = rs.retcode || rs.retCode || rs.code;
		let desc = rs.retdesc || rs.retDesc || rs.msg;
		let data = rs.data || {};
		// 统一转成字符串
		code = '' + code;
		if (!rs || code !== '200') {
			return Promise.reject({
				// 业务异常
				type: 'biz',
				code: code,
				msg: rs ? `(${code})${desc || '接口异常'}` : '接口数据异常！',
				data: data
			});
		}
		// console.log('Fetch成功', rs, this);
		// 正常，则直接返回数据对象
		return data;
	}
	return response;
}, function (error) {
	console.error(error)
	if(error.serverHand){
		return Promise.resolve({ name: 'lhr' })
	}
	return Promise.reject(error);
});