'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('../patch/matchMedia');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 轮播组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://github.com/akiran/react-slick
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * demo: http://neostack.com/opensource/react-slick
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author esky
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import './style/index.less'
// https://github.com/weblinc/media-match


var NavArrow = function NavArrow(props) {
  var _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === undefined ? 'ns-carousel-arrow' : _props$prefixCls,
      direction = props.direction,
      onClick = props.onClick;

  return _react2.default.createElement(
    'div',
    {
      className: prefixCls + ' ' + prefixCls + '-' + direction,
      onClick: onClick
    },
    _react2.default.createElement(_Icon2.default, { name: 'back' })
  );
};

var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel() {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.onWindowResized = function () {
      var slick = _this.slick;
      var autoplay = _this.props.autoplay;

      if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
        slick.innerSlider.autoPlay();
      }
    };

    _this.onWindowResized = (0, _debounce2.default)(_this.onWindowResized, 500, {
      leading: false
    });
    return _this;
  }

  Carousel.prototype.componentDidMount = function componentDidMount() {
    var autoplay = this.props.autoplay;

    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }
  };

  Carousel.prototype.componentWillUnmount = function componentWillUnmount() {
    var autoplay = this.props.autoplay;

    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
      this.onWindowResized.cancel();
    }
  };

  Carousel.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        vertical = _props.vertical,
        rest = _objectWithoutProperties(_props, ['prefixCls', 'vertical']);

    var className = prefixCls;
    if (vertical) className = prefixCls + ' ' + prefixCls + '-vertical';

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(_reactSlick2.default, _extends({
        ref: function ref(el) {
          _this2.slick = el;
        },
        vertical: vertical,
        prevArrow: _react2.default.createElement(NavArrow, { direction: 'prev' }),
        nextArrow: _react2.default.createElement(NavArrow, { direction: 'next' })
      }, rest))
    );
  };

  return Carousel;
}(_react2.default.Component);

Carousel.defaultProps = {
  prefixCls: 'ns-carousel',
  dots: true,
  arrows: false
};
exports.default = Carousel;