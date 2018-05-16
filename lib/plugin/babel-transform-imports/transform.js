'use strict';

var componentPathMap = {
    'Fetch': 'util/Fetch',
    'Moment': 'util/Moment',
    'URL': 'util/URL',
    'Verify': 'util/Verify'
};
var prePath = 'fego/lib/';
module.exports = function (importName, styleName) {
    if (styleName) {
        // set `style: true` option to transform style
        if (importName === styleName) {
            // full import
            // eg: `import xx from 'fego'`
            // will be transformed add `require('fego/lib/style.css')`
            return prePath + styleName;
        } else {
            // member import
            // eg: `import {xx} from 'fego'`
            // will be transformed add `require('fego/lib/xx/style.css')`
            return prePath + importName + '/' + styleName;
        }
    }
    if (componentPathMap[importName]) {
        return prePath + componentPathMap[importName];
    }
    return prePath + importName;
};