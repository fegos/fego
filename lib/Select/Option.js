'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = function (_Component) {
  _inherits(Option, _Component);

  function Option() {
    var _temp, _this, _ret;

    _classCallCheck(this, Option);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClick = function (e) {
      var disabled = _this.props.disabled;

      if (disabled) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation(); // 点击 disabled 的项应阻止其冒泡到全局
        return;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value,
          children = _this$props.children;

      onChange instanceof Function && onChange(value, children);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Option.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        style = _props.style,
        disabled = _props.disabled,
        children = _props.children,
        value = _props.value,
        selected = _props.selected,
        active = _props.active;


    return _react2.default.createElement(
      'li',
      {
        key: value,
        className: (0, _classnames2.default)('' + prefixCls, className, (_classNames = {}, _classNames[prefixCls + '-active'] = active, _classNames[prefixCls + '-selected'] = selected, _classNames[prefixCls + '-disabled'] = disabled, _classNames)),
        onClick: this.onClick,
        style: style
      },
      children
    );
  };

  return Option;
}(_react.Component);

Option.defaultProps = {};
Option.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.string,
  // 值
  value: _propTypes2.default.string.isRequired,
  // 子元素
  children: _propTypes2.default.node.isRequired,
  // 禁用
  disabled: _propTypes2.default.bool,
  // 是否选中
  selected: _propTypes2.default.bool,
  // 是否 active, 在键盘上下选中时激活
  active: _propTypes2.default.bool,
  // 选择回调
  onChange: _propTypes2.default.func
};
exports.default = Option;