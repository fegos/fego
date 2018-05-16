'use strict';

var _module$exports;

var styleIgnore = ['Fetch', 'URL', 'Verify',
// 'Card',
// 'Form',
// 'Icon',
'Menu'];
var merge = require('lodash/merge');
var defaultOpt = {
	"fego": {
		"transform": require('./transform'),
		style: {
			name: '/style',
			ignore: styleIgnore
		},
		preventFullImport: true
	}
};
module.exports = (_module$exports = {
	styleIgnore: styleIgnore }, _module$exports['styleIgnore'] = styleIgnore, _module$exports.defaultOpt = defaultOpt, _module$exports.create = function create(option, over) {
	if (over) return option || {};
	return merge(defaultOpt, option);
}, _module$exports);