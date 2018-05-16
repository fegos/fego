'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    var _temp, _this, _ret;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Card.prototype.renderHeader = function renderHeader() {
    var _props = this.props,
        prefixCls = _props.prefixCls,
        title = _props.title;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(prefixCls + '-header') },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls + '-title') },
        title
      )
    );
  };

  Card.prototype.renderCover = function renderCover() {
    var _classNames;

    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        cover = _props2.cover,
        title = _props2.title;

    var imgEl = null;
    if (typeof cover === 'string') {
      imgEl = _react2.default.createElement('img', { src: cover, alt: '' });
    } else if (_react2.default.isValidElement(cover)) {
      imgEl = cover;
    }
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(prefixCls + '-cover', (_classNames = {}, _classNames[prefixCls + '-cover-no-radius'] = title, _classNames))
      },
      imgEl
    );
  };

  Card.prototype.renderBody = function renderBody() {
    var _props3 = this.props,
        prefixCls = _props3.prefixCls,
        children = _props3.children;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(prefixCls + '-body') },
      children
    );
  };

  Card.prototype.renderFooter = function renderFooter() {
    var _props4 = this.props,
        prefixCls = _props4.prefixCls,
        footer = _props4.footer;

    var footEl = null;
    if (footer instanceof Array) {
      footEl = _react2.default.createElement(
        'ul',
        null,
        footer.map(function (item, i) {
          return _react2.default.createElement(
            'li',
            { key: item.id || item.key || i },
            item
          );
        })
      );
    } else if (typeof footer === 'string') {
      footEl = _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls + '-footer-txt') },
        footer
      );
    } else if (_react2.default.isValidElement(footer)) {
      footEl = footer;
    }
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(prefixCls + '-footer') },
      footEl
    );
  };

  Card.prototype.render = function render() {
    var _classNames2;

    var _props5 = this.props,
        prefixCls = _props5.prefixCls,
        children = _props5.children,
        className = _props5.className,
        style = _props5.style,
        title = _props5.title,
        cover = _props5.cover,
        border = _props5.border,
        hoverable = _props5.hoverable,
        footer = _props5.footer;


    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(prefixCls, className, (_classNames2 = {}, _classNames2[prefixCls + '-border'] = border, _classNames2[prefixCls + '-hoverable'] = hoverable, _classNames2)),
        style: style
      },
      title ? this.renderHeader() : null,
      cover ? this.renderCover() : null,
      children ? this.renderBody() : null,
      footer ? this.renderFooter() : null
    );
  };

  return Card;
}(_react2.default.Component);

Card.defaultProps = {
  prefixCls: 'ns-card',
  // 卡片标题
  title: '',
  // 是否有边框
  border: true,
  // 鼠标移过时是否浮起
  hoverable: true,
  // 封面图
  cover: '',
  // 底部
  footer: null
};
Card.propTypes = {
  prefixCls: _propTypes2.default.oneOf(['ns-card']),
  // 卡片标题
  title: _propTypes2.default.node,
  // 是否有边框
  border: _propTypes2.default.bool,
  // 鼠标移过时是否浮起
  hoverable: _propTypes2.default.bool,
  // 封面图
  cover: _propTypes2.default.node,
  // 底部，接收数组、字符串、节点三种类型
  footer: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.object), _propTypes2.default.string, _propTypes2.default.node])
};
exports.default = Card;