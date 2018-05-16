'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _PropsType = require('./PropsType');

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleClick = function (e) {
      if (_this.state.clicked) return;
      _this.setState({ clicked: true });
      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        return _this.setState({ clicked: false });
      }, 300);
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e);
      }
    };

    _this.state = {
      clicked: false,
      loading: props.loading
    };
    return _this;
  }

  Button.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var currentLoading = this.props.loading;
    var loading = nextProps.loading;

    if (currentLoading) {
      clearTimeout(this.delayTimeout);
    }
    if (typeof loading !== 'boolean' && loading && loading.delay) {
      this.delayTimeout = setTimeout(function () {
        return _this2.setState({ loading: loading });
      }, loading.delay);
    } else {
      this.setState({ loading: loading });
    }
  };

  Button.prototype.componentWillUnmount = function componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
    this.delayTimeout && clearTimeout(this.delayTimeout);
  };

  Button.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        type = _props.type,
        shape = _props.shape,
        _props$size = _props.size,
        size = _props$size === undefined ? '' : _props$size,
        className = _props.className,
        htmlType = _props.htmlType,
        children = _props.children,
        icon = _props.icon,
        prefixCls = _props.prefixCls,
        disabled = _props.disabled,
        dashed = _props.dashed,
        style = _props.style;
    var _state = this.state,
        loading = _state.loading,
        clicked = _state.clicked;

    var classes = (0, _classnames2.default)(prefixCls, className, (_classNames = {}, _classNames[prefixCls + '-' + type] = type, _classNames[prefixCls + '-' + shape] = shape, _classNames[prefixCls + '-lg'] = size === 'large', _classNames[prefixCls + '-sm'] = size === 'small', _classNames[prefixCls + '-dashed'] = dashed, _classNames[prefixCls + '-icon-only'] = !children && icon && !loading, _classNames[prefixCls + '-loading'] = loading, _classNames[prefixCls + '-clicked'] = clicked, _classNames));
    var iconName = loading ? 'loading' : icon;
    var iconEl = iconName ? _react2.default.createElement(_Icon2.default, { name: iconName }) : null;
    var needInserted = _react2.default.Children.count(children) === 1 && (!iconName || iconName === 'loading');
    var kids = _react2.default.Children.map(children, function (child) {
      return (0, _util2.default)(child, needInserted);
    });
    return _react2.default.createElement(
      'button',
      { type: htmlType, className: classes, onClick: this.handleClick, disabled: disabled, style: style },
      iconEl,
      kids
    );
  };

  return Button;
}(_react2.default.Component);

exports.default = Button;


Button.defaultProps = _PropsType.defaultProps;
Button.propTypes = _PropsType.propTypes;