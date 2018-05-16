'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Icon;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./font.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * 图标组件
                                                                                                                                                                                                                              * @author esky
                                                                                                                                                                                                                              */


function Icon(props) {
  var name = props.name,
      _props$className = props.className,
      className = _props$className === undefined ? '' : _props$className,
      spin = props.spin,
      size = props.size,
      width = props.width,
      height = props.height,
      _props$hrefPrefix = props.hrefPrefix,
      hrefPrefix = _props$hrefPrefix === undefined ? 'nsicon' : _props$hrefPrefix,
      style = props.style,
      rest = _objectWithoutProperties(props, ['name', 'className', 'spin', 'size', 'width', 'height', 'hrefPrefix', 'style']);

  var cls = (className + ' nsicon ' + (spin || name === 'loading' ? 'nsicon-spin' : '')).trim();
  var _style = _extends({}, style, { width: size || width, height: size || height });
  /**
  <!-- REACT JSX: -->
  <svg> <use xlinkHref='/svg/svg-sprite#my-icon' /> </svg>
  <!-- RENDERS AS: -->
  <svg> <use xlink:href="/svg/svg-sprite#my-icon"></use> </svg>
    */
  return _react2.default.createElement(
    'svg',
    _extends({ className: cls, style: _style, 'aria-hidden': 'true' }, rest),
    _react2.default.createElement('use', { xlinkHref: '#' + hrefPrefix + '-' + name })
  );
}
/**
symbol引用

这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章 这种用法其实是做了一个svg的集合，与另外两种相比具有如下特点：

支持多色图标了，不再受单色限制。
通过一些技巧，支持像字体那样，通过font-size,color来调整样式。
兼容性较差，支持 ie9+,及现代浏览器。
浏览器渲染svg的性能一般，还不如png。
 */