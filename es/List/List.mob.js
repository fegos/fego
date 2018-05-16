'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = List;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ListItem = require('./ListItem.mob');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function List(props) {
  var _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === undefined ? 'ns-list' : _props$prefixCls,
      className = props.className,
      style = props.style;


  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(prefixCls, className), style: style },
    props.children
  );
}

List.Item = _ListItem2.default;