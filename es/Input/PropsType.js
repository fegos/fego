'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propTypes = exports.defaultProps = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = exports.defaultProps = {
  // 前缀
  prefixCls: 'ns-input',
  // 大小
  size: 'default',
  // 是否显示清除按钮
  showClear: false,
  // 禁用
  disabled: false
};

var propTypes = exports.propTypes = {
  // 大小
  size: _propTypes2.default.oneOf(['default', 'large', 'small']),
  // 是否显示清除按钮
  showClear: _propTypes2.default.bool,
  // 默认值，非受控属性
  defaultValue: _propTypes2.default.string,
  // 受控属性 value
  value: _propTypes2.default.string,
  // 禁用
  disabled: _propTypes2.default.bool,
  // 回车回调
  onPressEnter: _propTypes2.default.func,
  // 按键按下回调
  onKeyDown: _propTypes2.default.func,
  // 输入框值发生变化回调
  onChange: _propTypes2.default.func,
  // 前缀图标
  prefix: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  // 后缀图标
  suffix: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])
};