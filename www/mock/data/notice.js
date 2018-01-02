/**
 * 公告管理数据模板文件
 */
'use strice'

module.exports = {
	'notice/manage/query/query': {
		delay: 300,
		response: function(req,res){
			return {
				'retcode': 200,
				// 'retcode': 5402,
				'retdesc': 'retdesc',
				'data': {
					"totalCount": 33,
					"result": [
						{
							"noticeId": "@string('number',10)",
							"title|5-10": '@cword',
							"publisher": '@cname',
							"organization|1": ['101', '102', '103', 'b'],
							"status|1": ['0', '1', '2', '3'],
							"releaseTime": '@datetime',
							"undoTime": '@datetime',
							"content": `<strong><span style="font-size:20px">各会员单位及客户：</span></strong><br />
&nbsp;&nbsp; &nbsp;&nbsp;<span style="color:#e74c3c">2017年4月14日</span>（星期五）为耶稣受难日，国际主流金融市场休市。为避免期间本市场无有效报价或报价不能正确反映市场供需，影响正常交易，交易中心将交易时间调整如下：<br />
&nbsp;&nbsp; &nbsp;&nbsp;4月14日（星期五）全天休市；4月15日、16日（星期六、日）为周末正常休市；4月17日（星期一）早上8:00照常开市，恢复正常交易。<br />
<img alt="" src="http://img.hhtcex.cn/www.hhtcex.com/product/1491994735302.png" /><img alt="" src="http://img.hhtcex.cn/www.hhtcex.com/product/1491994735302.png" />
<p>&nbsp;&nbsp;<a href="http://www.163.com"> &nbsp; <span style="font-family:Georgia,serif"><u>特此通知。</u>&nbsp;</span></a></p>

<div style="text-align:right">&nbsp;&nbsp;黑龙江华泰商品交易中心有限公司</div>

<div style="text-align:right">&nbsp;2017年3月10日 &nbsp; &nbsp;</div>`
						}
					],
				}
			}
		}
	},
	'notice/noticeList/list/query': {
		delay: 300,
		response: function (req, res) {
			return {
				'retcode': 200,
				retdesc: '',
				data: {
					'totalCount': 30,
					'result|30': [{
						'noticeId': '@id',
						'title':'@csentence'
					}]
				}
			}
		}
	},
}