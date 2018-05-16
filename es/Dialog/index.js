'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseDialog = require('./BaseDialog');

var _BaseDialog2 = _interopRequireDefault(_BaseDialog);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _PropsType = require('./PropsType');

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_React$Component) {
  _inherits(Dialog, _React$Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleCancel = function (e) {
      var onCancel = _this.props.onCancel;

      if (onCancel) {
        onCancel(e);
      }
    };
    _this.handleOk = function (e) {
      var onOk = _this.props.onOk;

      if (onOk) {
        onOk(e);
      }
    };
    return _this;
  }

  Dialog.prototype.render = function render() {
    var _props = this.props,
        prefixCls = _props.prefixCls,
        okText = _props.okText,
        cancelText = _props.cancelText,
        confirmLoading = _props.confirmLoading,
        footer = _props.footer,
        visible = _props.visible,
        rest = _objectWithoutProperties(_props, ['prefixCls', 'okText', 'cancelText', 'confirmLoading', 'footer', 'visible']);

    var dialogFooter = footer === undefined ? [_react2.default.createElement(
      _Button2.default,
      { key: 'cancel', onClick: this.handleCancel },
      cancelText
    ), _react2.default.createElement(
      _Button2.default,
      { key: 'confirm', type: 'primary', loading: confirmLoading, onClick: this.handleOk },
      okText
    )] : footer;

    return _react2.default.createElement(_BaseDialog2.default, _extends({}, rest, {
      onClose: this.handleCancel,
      footer: dialogFooter,
      visible: visible
    }));
  };

  return Dialog;
}(_react2.default.Component);

Dialog.confirm = _api.confirm;
Dialog.info = _api.info;
Dialog.warning = _api.warning;
Dialog.error = _api.error;
Dialog.success = _api.success;
exports.default = Dialog;


Dialog.defaultProps = _extends({}, _PropsType.defaultProps, {
  width: 520,
  closable: true
});

Dialog.propTypes = _PropsType.propTypes;