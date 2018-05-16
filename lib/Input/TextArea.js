'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _KeyCode = require('../common/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

var TextArea = function (_Component) {
  _inherits(TextArea, _Component);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onChange = function () {
      var val = _this.textareaRef.value;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value;


      if (value === undefined) {
        _this.resizeTextarea();
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

    _this.resizeTextarea = function () {
      var autoSize = _this.props.autoSize;

      if (!autoSize || !_this.textareaRef) {
        return;
      }
      var minRows = autoSize instanceof Object ? autoSize.minRows : null;
      var maxRows = autoSize instanceof Object ? autoSize.maxRows : null;

      var textareaStyles = (0, _util2.default)(_this.textareaRef, false, minRows, maxRows);

      _this.setState({ textareaStyles: textareaStyles });
    };

    _this.state = {
      textareaStyles: null
    };
    return _this;
  }

  TextArea.prototype.componentDidMount = function componentDidMount() {
    this.resizeTextarea();
  };

  TextArea.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
      if (this.nextFrameActionId) {
        clearNextFrameAction(this.nextFrameActionId);
      }
      this.nextFrameActionId = onNextFrame(this.resizeTextarea);
    }
  };

  TextArea.prototype.render = function render() {
    var _this2 = this,
        _classNames;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        style = _props.style,
        disabled = _props.disabled,
        onPressEnter = _props.onPressEnter,
        autoSize = _props.autoSize,
        resize = _props.resize,
        other = _objectWithoutProperties(_props, ['prefixCls', 'className', 'style', 'disabled', 'onPressEnter', 'autoSize', 'resize']);

    var otherProps = Object.assign({}, other);
    if ('value' in otherProps) {
      otherProps.defaultValue && delete otherProps.defaultValue;
    }
    var styles = _extends({}, style, this.state.textareaStyles);

    return _react2.default.createElement('textarea', _extends({
      ref: function ref(i) {
        _this2.textareaRef = i;
      },
      type: 'textarea'
    }, otherProps, {
      style: styles,
      disabled: disabled,
      className: (0, _classnames2.default)('' + prefixCls, className, (_classNames = {}, _classNames[prefixCls + '-disabled'] = disabled, _classNames[prefixCls + '-no-resize'] = !resize, _classNames)),
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    }));
  };

  return TextArea;
}(_react.Component);

TextArea.defaultProps = {
  // 前缀
  prefixCls: 'ns-input',
  // 禁用
  disabled: false,
  // 自适应内容高度
  autoSize: false,
  // 输入框大小能否改变
  resize: true
};
TextArea.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-input']),
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
  // 自适应内容高度
  autoSize: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
  // 输入框大小能否改变
  resize: _propTypes2.default.bool
};
exports.default = TextArea;