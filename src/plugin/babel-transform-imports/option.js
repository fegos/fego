let styleIgnore = [
	'Fetch',
	'URL',
	'Verify',
	// 'Card',
	// 'Form',
	// 'Icon',
	'Menu'
];
let merge = require('lodash/merge')
let defaultOpt = {
	"fego": {
		"transform": require('./transform'),
		style: {
			name: '/style',
			ignore: styleIgnore
		},
		preventFullImport: true
	}
}
module.exports = {
	styleIgnore, styleIgnore,
	defaultOpt: defaultOpt,
	/**
	 * 继承默认配置
	 * over = true 则不使用默认配置
	 */
	create: function (option, over) {
		if (over) return option || {};
		return merge(defaultOpt, option)
	}
}
