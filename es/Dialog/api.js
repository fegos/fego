'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.error = exports.warning = exports.info = exports.confirm = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _fego = require('fego');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Agent = function (_Component) {
  _inherits(Agent, _Component);

  function Agent() {
    var _temp, _this, _ret;

    _classCallCheck(this, Agent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      visible: true
    }, _this.onCancel = function (e) {
      var onCancel = _this.props.onCancel;

      if (onCancel instanceof Function) {
        onCancel(e);
      }
      _this.close();
    }, _this.onOk = function (e) {
      var onOk = _this.props.onOk;

      if (onOk instanceof Function) {
        onOk(e);
      }
      _this.close();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Agent.prototype.close = function close() {
    var _this2 = this;

    this.setState({
      visible: false
    }, function () {
      // dialog 打开和关闭有一个动画执行的时间，因此在动画时间结束后，再移除 dom
      // 300 是经验值，估计动画消失的时间应该是在 rc-animate 里定义的，
      var timer = setTimeout(function () {
        clearTimeout(timer);
        var mountNode = _this2.props.mountNode;

        var unmountResult = _reactDom2.default.unmountComponentAtNode(mountNode);
        if (unmountResult && mountNode.parentNode) {
          mountNode.parentNode.removeChild(mountNode);
        }
      }, 300);
    });
  };

  Agent.prototype.render = function render() {
    var _props = this.props,
        _props$prefixCls = _props.prefixCls,
        prefixCls = _props$prefixCls === undefined ? 'ns-dialog' : _props$prefixCls,
        type = _props.type,
        iconName = _props.iconName,
        title = _props.title,
        content = _props.content,
        okText = _props.okText,
        cancelText = _props.cancelText,
        cancel = _props.cancel;

    var footer = cancel ? [_react2.default.createElement(
      _fego.Button,
      { onClick: this.onCancel, key: 'cancel' },
      cancelText
    ), _react2.default.createElement(
      _fego.Button,
      { onClick: this.onOk, key: 'ok', type: 'primary' },
      okText
    )] : _react2.default.createElement(
      _fego.Button,
      { onClick: this.onOk, type: 'primary' },
      okText
    );
    return _react2.default.createElement(
      _index2.default,
      {
        className: prefixCls + '-' + type,
        visible: this.state.visible,
        width: 420,
        closable: false,
        maskClosable: false,
        footer: null,
        onOk: this.onOk,
        onCancel: this.onCancel
      },
      _react2.default.createElement(
        'div',
        { className: prefixCls + '-' + type + '-wrapper' },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-' + type + '-title' },
          _react2.default.createElement(_fego.Icon, { name: iconName }),
          title ? _react2.default.createElement(
            'span',
            { className: 'title' },
            title
          ) : null
        ),
        content ? _react2.default.createElement(
          'div',
          { className: prefixCls + '-' + type + '-content' },
          content
        ) : null
      ),
      _react2.default.createElement(
        'div',
        { className: prefixCls + '-' + type + '-btns' },
        footer
      )
    );
  };

  return Agent;
}(_react.Component);

function doRender(props) {
  var mountNode = document.createElement('div');
  document.body.appendChild(mountNode);
  (0, _reactDom.render)(_react2.default.createElement(Agent, _extends({}, props, { mountNode: mountNode })), mountNode);
}

function confirm(config) {
  var _config$okText = config.okText,
      okText = _config$okText === undefined ? '确定' : _config$okText,
      _config$cancelText = config.cancelText,
      cancelText = _config$cancelText === undefined ? '取消' : _config$cancelText,
      rest = _objectWithoutProperties(config, ['okText', 'cancelText']);

  var props = _extends({}, rest, {
    type: 'confirm',
    iconName: 'question-fill',
    cancel: true,
    okText: okText,
    cancelText: cancelText
  });
  doRender(props);
}

function info(config) {
  var _config$okText2 = config.okText,
      okText = _config$okText2 === undefined ? '知道了' : _config$okText2,
      rest = _objectWithoutProperties(config, ['okText']);

  var props = _extends({}, rest, {
    type: 'info',
    iconName: 'info',
    cancel: false,
    okText: okText
  });
  doRender(props);
}

function warning(config) {
  var _config$okText3 = config.okText,
      okText = _config$okText3 === undefined ? '知道了' : _config$okText3,
      rest = _objectWithoutProperties(config, ['okText']);

  var props = _extends({}, rest, {
    type: 'warning',
    iconName: 'warning',
    cancel: false,
    okText: okText
  });
  doRender(props);
}

function error(config) {
  var _config$okText4 = config.okText,
      okText = _config$okText4 === undefined ? '知道了' : _config$okText4,
      rest = _objectWithoutProperties(config, ['okText']);

  var props = _extends({}, rest, {
    type: 'error',
    iconName: 'error',
    cancel: false,
    okText: okText
  });
  doRender(props);
}

function success(config) {
  var _config$okText5 = config.okText,
      okText = _config$okText5 === undefined ? '知道了' : _config$okText5,
      rest = _objectWithoutProperties(config, ['okText']);

  var props = _extends({}, rest, {
    type: 'success',
    iconName: 'success',
    cancel: false,
    okText: okText
  });
  doRender(props);
}

exports.confirm = confirm;
exports.info = info;
exports.warning = warning;
exports.error = error;
exports.success = success;