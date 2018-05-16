'use strict';

exports.__esModule = true;
exports.propTypes = exports.defaultProps = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = exports.defaultProps = {
  // 前缀
  prefixCls: 'ns-btn',
  // 按钮类型
  type: 'default',
  // 是否禁用
  disabled: false,
  // button 原生的 type 值，可选值请参考 HTML 标准
  htmlType: 'button',
  // 加载中状态
  loading: false,
  // 虚线边框
  dashed: false
};

var propTypes = exports.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.string,
  // 按钮类型
  type: _propTypes2.default.oneOf(['default', 'primary', 'danger', 'ghost']),
  // 按钮形状
  shape: _propTypes2.default.oneOf(['circle', 'circle-outline']),
  // 按钮尺寸
  size: _propTypes2.default.string,
  // 是否禁用
  disabled: _propTypes2.default.bool,
  // button 原生的 type 值，可选值请参考 HTML 标准
  htmlType: _propTypes2.default.oneOf(['submit', 'button', 'reset']),
  // 点击回调
  onClick: _propTypes2.default.func,
  // 加载中状态
  loading: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
  // 类名
  className: _propTypes2.default.string,
  // 图标
  icon: _propTypes2.default.string,
  // 虚线边框
  dashed: _propTypes2.default.bool
};