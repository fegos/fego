'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyRenderBox = function (_React$Component) {
  _inherits(LazyRenderBox, _React$Component);

  function LazyRenderBox() {
    _classCallCheck(this, LazyRenderBox);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  LazyRenderBox.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  };

  LazyRenderBox.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        hiddenClassName = _props.hiddenClassName,
        visible = _props.visible,
        rest = _objectWithoutProperties(_props, ['className', 'hiddenClassName', 'visible']);

    var _className = className;
    if (!!hiddenClassName && !visible) {
      _className += ' ' + hiddenClassName;
    }
    return _react2.default.createElement('div', _extends({ className: _className }, rest));
  };

  return LazyRenderBox;
}(_react2.default.Component);

exports.default = LazyRenderBox;