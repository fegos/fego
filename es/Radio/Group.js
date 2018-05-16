'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup(props) {
    _classCallCheck(this, RadioGroup);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onChange = function (e) {
      var value = e.target.value;
      var onChange = _this.props.onChange;

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }
      // onChange instanceof Function && onChange(e)
      onChange instanceof Function && onChange(value);
    };

    _this.state = {
      value: 'value' in props ? props.value : props.defaultValue
    };
    return _this;
  }

  RadioGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  RadioGroup.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        style = _props.style,
        name = _props.name,
        children = _props.children,
        options = _props.options;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('' + prefixCls, className), style: style },
      children ? _react2.default.Children.map(children, function (child) {
        return _react2.default.cloneElement(child, {
          name: name,
          checked: child.props.value === _this2.state.value,
          onChange: _this2.onChange
        });
      }) : options.map(function (opt) {
        return _react2.default.createElement(
          _index2.default,
          {
            key: opt.value,
            value: opt.value,
            name: name,
            checked: opt.value === _this2.state.value,
            onChange: _this2.onChange,
            disabled: opt.disabled
          },
          opt.label
        );
      })
    );
  };

  return RadioGroup;
}(_react.Component);

RadioGroup.defaultProps = {
  // 前缀
  prefixCls: 'ns-radio-group'
};
RadioGroup.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-radio-group']),
  // RadioGroup 下所有 input[type="radio"] 的 name 属性
  name: _propTypes2.default.string.isRequired,
  // 受控属性，当前选中的值
  value: _propTypes2.default.string,
  // 非受控属性，默认选中的值
  defaultValue: _propTypes2.default.string,
  // 选项变化时的回调函数
  onChange: _propTypes2.default.func,
  // 以配置形式设置子元素
  options: _propTypes2.default.arrayOf(_propTypes2.default.object),
  // 子元素
  children: _propTypes2.default.node
};
exports.default = RadioGroup;