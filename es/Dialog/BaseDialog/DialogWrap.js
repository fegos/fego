'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _ContainerEnhance = require('./ContainerEnhance');

var _ContainerEnhance2 = _interopRequireDefault(_ContainerEnhance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DialogWrap = function (_React$Component) {
  _inherits(DialogWrap, _React$Component);

  function DialogWrap() {
    _classCallCheck(this, DialogWrap);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DialogWrap.prototype.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
    var visible = _ref.visible;

    return !!(this.props.visible || visible);
  };

  // componentWillUnmount() {
  //   if (this.props.visible) {
  //     this.renderComponent({
  //       afterClose: this.removeContainer,
  //       onClose() {
  //       },
  //       visible: false,
  //     });
  //   } else {
  //     this.removeContainer();
  //   }
  // }

  DialogWrap.prototype.getElement = function getElement(part) {
    return this._component.getElement(part);
  };

  DialogWrap.prototype.render = function render() {
    return null;
  };

  return DialogWrap;
}(_react2.default.Component);

DialogWrap.defaultProps = {
  visible: false
};
DialogWrap.displayName = 'DialogWrap';
exports.default = (0, _ContainerEnhance2.default)(DialogWrap, {
  isVisible: function isVisible(instance) {
    return instance.props.visible;
  },

  autoDestroy: true,
  getComponent: function getComponent(instance, extra) {
    return _react2.default.createElement(_Dialog2.default, _extends({}, instance.props, extra, {
      key: 'dialog'
    }));
  },
  getContainer: function getContainer(instance) {
    if (instance.props.getContainer) {
      return instance.props.getContainer();
    }
    var container = document.createElement('div');
    document.body.appendChild(container);
    return container;
  }
});