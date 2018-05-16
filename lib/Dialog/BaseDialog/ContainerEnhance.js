'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function defaultGetContainer() {
  var container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}

exports.default = function (TarComponent, config) {
  var _class, _temp2;

  var _config$autoMount = config.autoMount,
      autoMount = _config$autoMount === undefined ? true : _config$autoMount,
      _config$autoDestroy = config.autoDestroy,
      autoDestroy = _config$autoDestroy === undefined ? true : _config$autoDestroy,
      isVisible = config.isVisible,
      getComponent = config.getComponent,
      _config$getContainer = config.getContainer,
      getContainer = _config$getContainer === undefined ? defaultGetContainer : _config$getContainer;

  return _temp2 = _class = function (_TarComponent) {
    _inherits(_class, _TarComponent);

    function _class() {
      var _temp, _this, _ret;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _TarComponent.call.apply(_TarComponent, [this].concat(args))), _this), _this.instance = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _class.prototype.renderComponent = function renderComponent(componentArg, ready) {
      var instance = this.instance;

      if (!isVisible || instance._component || isVisible(instance)) {
        if (!instance._container) {
          instance._container = getContainer(instance);
        }
        var component = void 0;
        if (instance.getComponent) {
          component = instance.getComponent(componentArg);
        } else {
          component = getComponent(instance, componentArg);
        }
        _reactDom2.default.unstable_renderSubtreeIntoContainer(instance, component, instance._container, function callback() {
          instance._component = this;
          if (ready) {
            ready.call(this);
          }
        });
      }
    };

    _class.prototype.componentDidMount = function componentDidMount() {
      autoMount && this.renderComponent();
    };

    _class.prototype.componentDidUpdate = function componentDidUpdate() {
      autoMount && this.renderComponent();
    };

    _class.prototype.componentWillUnmount = function componentWillUnmount() {
      autoDestroy && this.removeContainer();
    };

    _class.prototype.removeContainer = function removeContainer() {
      var instance = this.instance;

      if (instance._container) {
        var container = instance._container;
        _reactDom2.default.unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
        instance._container = null;
      }
    };

    _class.prototype.render = function render() {
      var _this2 = this;

      return _react2.default.createElement(TarComponent, _extends({ ref: function ref(instance) {
          _this2.instance = instance;
        } }, this.props));
    };

    return _class;
  }(TarComponent), _class.displayName = 'ContainerEnhance', _temp2;
};