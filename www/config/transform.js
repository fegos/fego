let orgTransform = require('../../src/plugin/babel-transform-imports/transform')
module.exports = function(importName, styleName) {
	let pathStr = orgTransform(importName, styleName)
    return pathStr.replace(/\/lib/, '');
};