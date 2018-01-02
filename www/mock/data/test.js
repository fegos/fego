/**
 * 组件测试数据模板文件
 */
'use strice'

module.exports = {
	'test': {
		'retcode': 200,
		'retdesc': 'success'
	},
	'test/table': {
		delay: 300,
		response: function(req, res) {
			return {
				'retcode': 2001,
				'retdesc': 'success',
				'data': {
					"totalCount": 33,
					"result|33": [{
						'id|+1': 1,
						'name': '@name',
						'age|10-30': 1,
						'sex|1': ['女', '男'],
						company: 'ease',
						street: '软件园',
						building: '网易大厦',
						number: '32-3',
						companyAddress: '软件园二期',
						companyName: 'netease',
						'gender|1': ['女', '男']
					}]
				}
			}
		}
	},
}