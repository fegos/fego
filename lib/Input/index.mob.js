'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _KeyCode = require('../common/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _PropsType = require('./PropsType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    /**
     * showClear 为 false, 则 showClearIcon 一定为初始默认值 false
     * showClear 为 true, 则 showClearIcon 的值根据输入框内容决定，有内容，则为 true，否则为 false
     */
    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onChange = function () {
      var val = _this.inputRef.value;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value,
          showClear = _this$props.showClear;


      if (value === undefined) {
        // 非受控
        // 更新清除图标是否显示的状态
        showClear && _this.setState({
          showClearIcon: !!val
        });
      }
      onChange instanceof Function && onChange(val);
    };

    _this.onKeyDown = function (e) {
      var _this$props2 = _this.props,
          onPressEnter = _this$props2.onPressEnter,
          onKeyDown = _this$props2.onKeyDown;

      if (e.nativeEvent.keyCode === _KeyCode2.default.ENTER && onPressEnter instanceof Function) {
        onPressEnter(e.nativeEvent);
      }
      if (onKeyDown instanceof Function) {
        onKeyDown(e.nativeEvent);
      }
    };

    _this.onTouchStart = function () {
      if (_this.state.clearIconClicked) return;
      if (_this.props.disabled) return;
      _this.setState({
        clearIconClicked: true
      });
    };

    _this.onTouchEnd = function () {
      _this.setState({
        clearIconClicked: false
      });
      var _this$props3 = _this.props,
          value = _this$props3.value,
          onChange = _this$props3.onChange,
          showClear = _this$props3.showClear;

      if (value === undefined) {
        _this.inputRef.value = ''; // 清空输入框
        // 更新清除图标是否显示的状态
        showClear && _this.setState({
          showClearIcon: false
        });
      }
      _this.inputRef.focus();
      onChange instanceof Function && onChange('');
    };

    var initialValue = props.value === undefined ? props.defaultValue : props.value;
    _this.state = {
      showClearIcon: props.showClear && !!initialValue,
      clearIconClicked: false
    };
    return _this;
  }

  Input.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      // 受控
      // 更新清除图标是否显示的状态
      nextProps.showClear && this.setState({
        showClearIcon: !!nextProps.value
      });
    }
  };

  Input.prototype.render = function render() {
    var _this2 = this,
        _classNames;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        style = _props.style,
        disabled = _props.disabled,
        size = _props.size,
        onPressEnter = _props.onPressEnter,
        suffix = _props.suffix,
        prefix = _props.prefix,
        showClear = _props.showClear,
        other = _objectWithoutProperties(_props, ['prefixCls', 'className', 'style', 'disabled', 'size', 'onPressEnter', 'suffix', 'prefix', 'showClear']);

    var otherProps = Object.assign({}, other);
    if ('value' in otherProps) {
      otherProps.defaultValue && delete otherProps.defaultValue;
    }
    var ipt = _react2.default.createElement('input', _extends({
      ref: function ref(i) {
        _this2.inputRef = i;
      },
      type: 'text'
    }, otherProps, {
      disabled: disabled,
      className: (0, _classnames2.default)('' + prefixCls, className, (_classNames = {}, _classNames[prefixCls + '-sm'] = size === 'small', _classNames[prefixCls + '-lg'] = size === 'large', _classNames[prefixCls + '-disabled'] = disabled, _classNames)),
      style: style,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    }));

    if (prefix || suffix || showClear && !disabled) {
      var _classNames2;

      // 只有非 disabled 的输入框才渲染清除按钮
      return _react2.default.createElement(
        'span',
        { className: (0, _classnames2.default)(prefixCls + '-affix-wrapper') },
        prefix ? _react2.default.createElement(
          'span',
          { className: prefixCls + '-prefix' },
          prefix
        ) : null,
        ipt,
        showClear && !disabled ? _react2.default.createElement(
          'span',
          {
            className: (0, _classnames2.default)(prefixCls + '-clear', (_classNames2 = {}, _classNames2[prefixCls + '-clear-hide'] = !this.state.showClearIcon, _classNames2[prefixCls + '-clear-click'] = !this.state.clearIconClicked, _classNames2)),
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd
          },
          _react2.default.createElement(_Icon2.default, { name: 'no', className: prefixCls + '-icon' })
        ) : null,
        suffix ? _react2.default.createElement(
          'span',
          { className: prefixCls + '-suffix' },
          suffix
        ) : null
      );
    }

    return ipt;
  };

  return Input;
}(_react.Component);

exports.default = Input;


Input.TextArea = _TextArea2.default;
Input.defaultProps = _PropsType.defaultProps;
Input.propTypes = _PropsType.propTypes;