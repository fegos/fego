'use strict';

exports.__esModule = true;
exports.propTypes = exports.defaultProps = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = exports.defaultProps = {
  // 前缀
  prefixCls: 'ns-dialog',
  // 宽度，PC 默认520 Wap 默认100%，单独设定
  // width: ,
  // 模态框出现动画，暂时不知支持的选项有哪些
  transitionName: 'zoom',
  // 模态框背景出现动画，暂时不知支持的选项有哪些
  maskTransitionName: 'fade',
  // 点击确认按钮时按钮是否出现loading状态
  confirmLoading: false,
  // 是否可见
  visible: false,
  // 确认按钮文案
  okText: '确定',
  // 取消按钮文案
  cancelText: '取消',
  // 是否显示右上角的关闭按钮, PC 默认true Wap 默认false，单独设定
  // closable: ,
  // 是否能通过点击背景关闭模态框
  maskClosable: true
};

var propTypes = exports.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.string,
  // 确认按钮回调
  onOk: _propTypes2.default.func,
  // 取消按钮回调
  onCancel: _propTypes2.default.func,
  // 确认按钮文案
  okText: _propTypes2.default.node,
  // 取消按钮文案
  cancelText: _propTypes2.default.node,
  // 宽度
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  // 点击确认按钮时按钮是否出现loading状态
  confirmLoading: _propTypes2.default.bool,
  // 是否可见
  visible: _propTypes2.default.bool,
  // 底部内容
  footer: _propTypes2.default.node,
  // 标题
  title: _propTypes2.default.node,
  // 是否显示右上角的关闭按钮
  closable: _propTypes2.default.bool,
  // 模态框出现动画
  transitionName: _propTypes2.default.string,
  // 模态框背景出现动画
  maskTransitionName: _propTypes2.default.string,
  // 是否能通过点击背景关闭模态框
  maskClosable: _propTypes2.default.bool
};