'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Group = require('./Group');

var _Group2 = _interopRequireDefault(_Group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = function (_Component) {
  _inherits(Radio, _Component);

  function Radio(props) {
    _classCallCheck(this, Radio);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onChange = function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled;
      var checked = e.nativeEvent.target.checked;


      if (disabled) return;

      if (!('checked' in _this.props)) {
        _this.setState({
          checked: checked
        });
      }

      onChange instanceof Function && onChange(e.nativeEvent);
    };

    _this.state = {
      checked: 'checked' in props ? props.checked : props.defaultChecked
    };
    return _this;
  }

  Radio.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps && nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  };

  Radio.prototype.renderLabel = function renderLabel() {
    var _props = this.props,
        prefixCls = _props.prefixCls,
        label = _props.label,
        children = _props.children;


    if (children) {
      return _react2.default.createElement(
        'span',
        { className: prefixCls + '-label' },
        children
      );
    } else if (label) {
      return _react2.default.createElement(
        'span',
        { className: prefixCls + '-label' },
        label
      );
    }
    return null;
  };

  Radio.prototype.render = function render() {
    var _classNames,
        _this2 = this;

    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        className = _props2.className,
        style = _props2.style,
        children = _props2.children,
        disabled = _props2.disabled,
        otherProps = _objectWithoutProperties(_props2, ['prefixCls', 'className', 'style', 'children', 'disabled']);

    return _react2.default.createElement(
      'label',
      {
        htmlFor: otherProps.id,
        className: (0, _classnames2.default)(prefixCls + '-wrapper', className),
        style: style
      },
      _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)('' + prefixCls, (_classNames = {}, _classNames[prefixCls + '-checked'] = this.state.checked, _classNames[prefixCls + '-disabled'] = disabled, _classNames))
        },
        _react2.default.createElement('input', _extends({
          type: 'radio',
          ref: function ref(i) {
            _this2.radioRef = i;
          }
        }, otherProps, {
          disabled: disabled,
          className: prefixCls + '-ipt',
          onChange: this.onChange
        })),
        _react2.default.createElement(
          'span',
          { className: prefixCls + '-inner' },
          _react2.default.createElement('span', { className: prefixCls + '-inner-circle' })
        )
      ),
      this.renderLabel()
    );
  };

  return Radio;
}(_react.Component);

Radio.defaultProps = {
  // 前缀
  prefixCls: 'ns-radio'
};
Radio.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-radio']),
  // radio label 文案
  label: _propTypes2.default.string,
  // radio label 文案，使用则 labe 属性失效
  children: _propTypes2.default.node,
  // 受控属性，当前是否选中，需配合 onChane 使用
  checked: _propTypes2.default.bool,
  // 回调
  onChange: _propTypes2.default.func,
  // 非受控属性，当前是否选中
  defaultChecked: _propTypes2.default.bool,
  // 是否禁用
  disabled: _propTypes2.default.bool
};
exports.default = Radio;


Radio.Group = _Group2.default;