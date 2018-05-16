'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_Component) {
  _inherits(ListItem, _Component);

  // 左滑有显示的内容的宽度
  function ListItem(props) {
    _classCallCheck(this, ListItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.touchEvent = {};
    _this.width = 88;

    _this.onTouchStart = function (e) {
      if (_this.state.clicked) return;
      var touchEvent = e.nativeEvent;
      var touch = touchEvent.changedTouches[0];
      _this.touchEvent.pageX = touch.pageX;
      _this.touchEvent.pageY = touch.pageY;
      _this.touchEvent.screenX = touch.screenX;
      _this.touchEvent.screenY = touch.screenY;
      _this.setState({
        clicked: true
      });
    };

    _this.onTouchMove = function (e) {
      if (!_this.props.slip) return;

      // 启动左滑功能的才处理 move 事件
      var touchEvent = e.nativeEvent;
      var touch = touchEvent.changedTouches[0];
      var diffScreenY = touch.screenY - _this.touchEvent.screenY;
      if (Math.abs(diffScreenY) > touchEvent.target.offsetHeight) return;

      var diffScreenX = touch.screenX - _this.touchEvent.screenX;
      var left = diffScreenX;

      if (diffScreenX > 0) {
        // ➡️右滑，直接设为 0
        left = 0;
      } else if (diffScreenX < 0 - _this.width || _this.state.expand) {
        // ⬅️左滑，但超过了宽度，或是已展开的情况下左滑，都维持最大宽度
        left = 0 - _this.width;
      }

      _this.setState({
        moving: true,
        left: left
      });
    };

    _this.onTouchEnd = function (e) {
      var touchEvent = e.nativeEvent;
      var touch = touchEvent.changedTouches[0];
      var _state = {
        moving: false,
        clicked: false
      };
      var _this$state = _this.state,
          moving = _this$state.moving,
          expand = _this$state.expand;
      // 滑动中->滑动结束

      if (moving) {
        var diffScreenX = touch.screenX - _this.touchEvent.screenX;
        var diffScreenY = touch.screenY - _this.touchEvent.screenY;
        var left = diffScreenX;
        var expand2 = void 0;
        if (Math.abs(diffScreenY) <= touchEvent.target.offsetHeight) {
          if (diffScreenX > 0) {
            // ➡️右滑
            left = 0;
            expand2 = false;
          } else {
            // ⬅️左滑
            if (left < 0 - _this.width) {
              left = 0 - _this.width;
            }

            if (Math.abs(left) >= _this.width / 2) {
              // 滑动超过宽度的一半就展开
              left = 0 - _this.width;
              expand2 = true;
            } else {
              // 未超过宽度的一半不展开
              left = 0;
              expand2 = false;
            }
          }
        } else {
          left = 0;
          expand2 = false;
        }

        _state = _extends({}, _state, {
          expand: expand2,
          left: left
        });
      } else if (expand) {
        // 点击，但是已展开的时候，关闭展开
        _state = _extends({}, _state, {
          left: 0,
          expand: false
        });
      } else {
        // 未启动左滑,则处理点击事件
        var diffPageX = touch.pageX - _this.touchEvent.pageX;
        var diffPageY = touch.pageY - _this.touchEvent.pageY;
        var onClick = _this.props.onClick;
        // 点击回调的要求：触摸开始和结束时同一个点

        if (diffPageX === 0 && diffPageY === 0) {
          onClick(e);
        }
      }

      _this.setState(_state);
    };

    _this.onTouchCancel = function () {
      _this.setState({
        clicked: false,
        moving: false,
        left: 0
      });
    };

    _this.handleSlipTouchEnd = function () {
      var onSlipItemClick = _this.props.onSlipItemClick;


      onSlipItemClick instanceof Function && onSlipItemClick();

      _this.setState({
        moving: false,
        expand: false,
        left: 0
      });
    };

    _this.state = {
      clicked: false, // list item 是否被点击
      moving: false, // list item 是否处于 touchmove 事件中, slip 为 true 时生效
      left: 0, // slip 为 true 时 list item 的偏移量
      expand: false // touchmove 事件的结果是'删除'是否显示出来了, slip 为 true 时生效
    };
    return _this;
  }

  ListItem.prototype.render = function render() {
    var _classNames, _classNames2, _classNames3;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        title = _props.title,
        subTitle = _props.subTitle,
        wrap = _props.wrap,
        hasRightArrow = _props.hasRightArrow,
        extra = _props.extra,
        verticalAlign = _props.verticalAlign,
        iconName = _props.iconName,
        slip = _props.slip,
        children = _props.children,
        className = _props.className,
        highlight = _props.highlight,
        link = _props.link,
        style = _props.style;
    // 处理有左滑时候的样式

    var finalStyle = {};
    if (slip) {
      finalStyle.left = this.state.left + 'px';
    }
    var TagName = link ? _reactRouterDom.Link : 'div';
    var extraProps = link ? { to: link } : {};
    return _react2.default.createElement(
      TagName,
      _extends({
        className: (0, _classnames2.default)(prefixCls + '-item', className, (_classNames = {}, _classNames[prefixCls + '-item-clicked'] = highlight && this.state.clicked, _classNames[prefixCls + '-item-slip'] = slip, _classNames)),
        style: style,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd,
        onTouchCancel: this.onTouchCancel,
        onTouchMove: this.onTouchMove
      }, extraProps),
      _react2.default.createElement(
        'div',
        { className: prefixCls + '-item-inner', style: finalStyle },
        iconName ? _react2.default.createElement(
          'div',
          { className: prefixCls + '-icon' },
          _react2.default.createElement(_Icon2.default, { name: iconName })
        ) : null,
        children ? _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(prefixCls + '-title', (_classNames2 = {}, _classNames2[prefixCls + '-title-nowrap'] = !wrap, _classNames2))
          },
          children
        ) : _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(prefixCls + '-title', (_classNames3 = {}, _classNames3[prefixCls + '-title-nowrap'] = !wrap, _classNames3))
          },
          title,
          subTitle ? _react2.default.createElement(
            'div',
            { className: prefixCls + '-sub-title' },
            subTitle
          ) : null
        ),
        extra !== undefined ? _react2.default.createElement(
          'div',
          { className: prefixCls + '-extra' },
          extra
        ) : null,
        hasRightArrow ? _react2.default.createElement(
          'div',
          { className: prefixCls + '-arrow' },
          _react2.default.createElement(_Icon2.default, { name: 'right-arrow' })
        ) : null
      ),
      slip ? _react2.default.createElement(
        'div',
        { className: prefixCls + '-item-del', style: { width: this.width + 'px' }, onTouchEnd: this.handleSlipTouchEnd },
        '\u5220 \u9664'
      ) : null
    );
  };

  return ListItem;
}(_react.Component);

ListItem.defaultProps = {
  // 前缀
  prefixCls: 'ns-list',
  // 是否显示右箭头
  hasRightArrow: true,
  // 点击回调
  onClick: function onClick() {},
  // 垂直方向的对其方式
  // verticalAlign: 'center',
  // 清单内容过多时是否折行显示, true - 折行显示 false - 不折行显示，超出部分显示省略号
  wrap: true,
  // 是否能左滑
  slip: false,
  // 高亮色
  highlight: true
};
ListItem.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-list']),
  // 标题
  title: _propTypes2.default.node,
  // 副标题
  subTitle: _propTypes2.default.node,
  // 子元素集，若使用则其他的内容相关props, eg: title, subTitle 将失效
  children: _propTypes2.default.node,
  // 右边内容
  extra: _propTypes2.default.node,
  // 左侧图标的名称
  iconName: _propTypes2.default.string,
  // 是否显示右箭头
  hasRightArrow: _propTypes2.default.bool,
  // 点击回调
  onClick: _propTypes2.default.func,
  // 垂直方向的对其方式
  /**
   * 2018.03.13 备注：该属性没看出来有什么作用，暂时先取消了
   */
  // verticalAlign: PropTypes.oneOf(['center', 'top', 'bottom']),
  // 清单内容过多时是否折行显示, true - 折行显示 false - 不折行显示，超出部分显示省略号
  wrap: _propTypes2.default.bool,
  // 是否能左滑显示'删除'
  slip: _propTypes2.default.bool,
  // 点击左滑显示'删除'的回调
  onSlipItemClick: _propTypes2.default.func,
  // 高亮色
  highlight: _propTypes2.default.bool,
  // 是否渲染成链接
  link: _propTypes2.default.string
};
exports.default = ListItem;