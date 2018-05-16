'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = function (_React$Component) {
  _inherits(Loading, _React$Component);

  function Loading(props) {
    _classCallCheck(this, Loading);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      loading: props.loading
    };
    _this.timer = null;
    return _this;
  }

  Loading.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var loading = nextProps.loading,
        delay = nextProps.delay;

    if (loading !== this.props.loading) {
      if (loading) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
          // 启动loading，根据设置的延迟时间来启动
          _this2.setState({
            loading: true
          });
          clearTimeout(_this2.timer);
        }, delay);
      } else {
        // 取消loading，直接取消，不设置延迟
        this.setState({
          loading: false
        });
      }
    }
  };

  Loading.prototype.renderBody = function renderBody() {
    var _classNames;

    var _props = this.props,
        type = _props.type,
        size = _props.size,
        tip = _props.tip,
        prefixCls = _props.prefixCls;


    var tipEl = null;
    if (tip) {
      tipEl = _react2.default.createElement(
        'span',
        null,
        tip
      );
    }
    var iconEl = null;
    var cls = (0, _classnames2.default)(prefixCls + '-icon', (_classNames = {}, _classNames[prefixCls + '-icon-sm'] = size === 'small', _classNames[prefixCls + '-icon-lg'] = size === 'large', _classNames));
    if (type === 'bar') {
      iconEl = _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement('span', { className: 'bar' }),
        _react2.default.createElement('span', { className: 'bar bar-2' }),
        _react2.default.createElement('span', { className: 'bar bar-3' })
      );
    } else if (type === 'circle') {
      iconEl = _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement(_Icon2.default, { name: 'loading', className: 'circle' })
      );
    } else if (_react2.default.isValidElement(type)) {
      iconEl = _react2.default.createElement(
        'div',
        { className: cls },
        type
      );
    }
    return _react2.default.createElement(
      'div',
      { className: prefixCls + '-ctn' },
      iconEl,
      tipEl
    );
  };

  Loading.prototype.render = function render() {
    var _classNames2;

    var _props2 = this.props,
        children = _props2.children,
        prefixCls = _props2.prefixCls;
    var loading = this.state.loading;

    return _react2.default.createElement(
      'div',
      { className: '' + prefixCls },
      loading ? this.renderBody() : null,
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)((_classNames2 = {}, _classNames2[prefixCls + '-container'] = true, _classNames2['is-loading'] = loading, _classNames2['f-cb'] = true, _classNames2))
        },
        children
      )
    );
  };

  return Loading;
}(_react2.default.Component);

Loading.defaultProps = {
  // 前缀
  prefixCls: 'ns-loading',
  // 状态
  loading: true,
  // 时间延迟
  delay: 0,
  // 文案
  type: 'bar',
  // icon 大小
  tip: '',
  // icon 大小
  size: 'default'
};
Loading.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-loading']),
  // 状态
  loading: _propTypes2.default.bool,
  // 时间延迟
  delay: _propTypes2.default.number,
  // 文案
  tip: _propTypes2.default.string,
  // 默认的icon类型:'bar', 'circle', 或自定义
  type: _propTypes2.default.node,
  // icon 大小
  size: _propTypes2.default.oneOf(['default', 'small', 'large'])
};
exports.default = Loading;