'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _KeyCode = require('../../common/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _LazyRenderBox = require('./LazyRenderBox');

var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);

var _Icon = require('../../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _tool = require('./tool');

var _tool2 = _interopRequireDefault(_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uuid = 0;
var openCount = 0;

var Dialog = function (_React$Component) {
  _inherits(Dialog, _React$Component);

  function Dialog() {
    var _temp, _this, _ret;

    _classCallCheck(this, Dialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onAnimateLeave = function () {
      if (_this.wrapRef) {
        _this.wrapRef.style.display = 'none';
      }
      _this.inTransition = false;
      _this.removeScrollingEffect();
      _this.props.afterClose();
    }, _this.onMaskClick = function (e) {
      if (Date.now() - _this.openTime < 300) return;
      if (e.target === e.currentTarget) _this.close(e);
    }, _this.onKeyDown = function (e) {
      var _this$props = _this.props,
          keyboard = _this$props.keyboard,
          visible = _this$props.visible;

      if (keyboard && e.keyCode === _KeyCode2.default.ESC) {
        _this.close(e);
      }
      if (visible) {
        if (e.keyCode === _KeyCode2.default.TAB) {
          var _document = document,
              activeElement = _document.activeElement;

          var dialogRoot = _this.wrapRef;
          if (e.shiftKey) {
            if (activeElement === dialogRoot) {
              _this.sentinelRef.focus();
            }
          } else if (activeElement === _this.sentinelRef) {
            dialogRoot.focus();
          }
        }
      }
    }, _this.getDialogElement = function () {
      var _this$props2 = _this.props,
          closable = _this$props2.closable,
          prefixCls = _this$props2.prefixCls,
          width = _this$props2.width,
          height = _this$props2.height,
          footer = _this$props2.footer,
          visible = _this$props2.visible,
          style = _this$props2.style,
          title = _this$props2.title,
          className = _this$props2.className,
          bodyStyle = _this$props2.bodyStyle,
          bodyProps = _this$props2.bodyProps,
          children = _this$props2.children;

      var dest = {};
      if (width !== undefined) {
        dest.width = width;
      }
      if (height !== undefined) {
        dest.height = height;
      }

      var _footer = footer;
      if (_footer) {
        _footer = _react2.default.createElement(
          'div',
          { className: prefixCls + '-footer', ref: function ref(i) {
              _this.footerRef = i;
            } },
          _footer
        );
      }

      var header = void 0;
      if (title) {
        header = _react2.default.createElement(
          'div',
          { className: prefixCls + '-header', ref: function ref(i) {
              _this.headerRef = i;
            } },
          _react2.default.createElement(
            'div',
            { className: prefixCls + '-title', id: _this.titleId },
            title
          )
        );
      }

      var closer = void 0;
      if (closable) {
        closer = _react2.default.createElement(
          'button',
          {
            onClick: _this.close,
            'aria-label': 'Close',
            className: prefixCls + '-close'
          },
          _react2.default.createElement(_Icon2.default, { className: prefixCls + '-close-x', name: 'no' })
        );
      }

      var _style = _extends({}, style, dest);
      var transitionName = _this.getTransitionName();
      var dialogElement = _react2.default.createElement(
        _LazyRenderBox2.default,
        {
          key: 'dialog-element',
          role: 'document',
          ref: function ref(i) {
            _this.dialogRef = i;
          },
          style: _style,
          className: prefixCls + ' ' + (className || ''),
          visible: visible
        },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-content' },
          closer,
          header,
          _react2.default.createElement(
            'div',
            _extends({
              className: prefixCls + '-body',
              style: bodyStyle,
              ref: function ref(i) {
                _this.bodyRef = i;
              }
            }, bodyProps),
            children
          ),
          _footer
        ),
        _react2.default.createElement(
          'div',
          { tabIndex: 0, ref: function ref(i) {
              _this.sentinelRef = i;
            }, style: { width: 0, height: 0, overflow: 'hidden' } },
          'sentinel'
        )
      );
      return _react2.default.createElement(
        _rcAnimate2.default,
        {
          key: 'dialog',
          showProp: 'visible',
          onLeave: _this.onAnimateLeave,
          transitionName: transitionName,
          component: '',
          transitionAppear: true
        },
        dialogElement
      );
    }, _this.getZIndexStyle = function () {
      var style = {};
      var zIndex = _this.props.zIndex;

      if (zIndex !== undefined) {
        style.zIndex = zIndex;
      }
      return style;
    }, _this.getWrapStyle = function () {
      return _extends({}, _this.getZIndexStyle(), _this.props.wrapStyle);
    }, _this.getMaskStyle = function () {
      return _extends({}, _this.getZIndexStyle(), _this.props.maskStyle);
    }, _this.getMaskElement = function () {
      var _this$props3 = _this.props,
          mask = _this$props3.mask,
          prefixCls = _this$props3.prefixCls,
          visible = _this$props3.visible,
          maskProps = _this$props3.maskProps;

      var maskElement = void 0;
      if (mask) {
        var maskTransition = _this.getMaskTransitionName();
        maskElement = _react2.default.createElement(_LazyRenderBox2.default, _extends({
          style: _this.getMaskStyle(),
          key: 'mask',
          className: prefixCls + '-mask',
          hiddenClassName: prefixCls + '-mask-hidden',
          visible: visible
        }, maskProps));
        if (maskTransition) {
          maskElement = _react2.default.createElement(
            _rcAnimate2.default,
            {
              key: 'mask',
              showProp: 'visible',
              transitionAppear: true,
              component: '',
              transitionName: maskTransition
            },
            maskElement
          );
        }
      }
      return maskElement;
    }, _this.getMaskTransitionName = function () {
      var _this$props4 = _this.props,
          maskTransitionName = _this$props4.maskTransitionName,
          maskAnimation = _this$props4.maskAnimation,
          prefixCls = _this$props4.prefixCls;

      var transitionName = maskTransitionName;
      var animation = maskAnimation;
      if (!transitionName && animation) {
        transitionName = prefixCls + '-' + animation;
      }
      return transitionName;
    }, _this.getTransitionName = function () {
      var _this$props5 = _this.props,
          transitionName = _this$props5.transitionName,
          animation = _this$props5.animation,
          prefixCls = _this$props5.prefixCls;

      var _transitionName = transitionName;
      if (!_transitionName && animation) {
        _transitionName = prefixCls + '-' + animation;
      }
      return _transitionName;
    }, _this.setScrollbar = function () {
      if (_this.bodyIsOverflowing && _this.scrollbarWidth !== undefined) {
        document.body.style.paddingRight = _this.scrollbarWidth + 'px';
      }
    }, _this.addScrollingEffect = function () {
      openCount++;
      if (openCount !== 1) {
        return;
      }
      _this.checkScrollbar();
      _this.setScrollbar();
      document.body.style.overflow = 'hidden';
      // this.adjustDialog();
    }, _this.removeScrollingEffect = function () {
      openCount--;
      if (openCount !== 0) {
        return;
      }
      document.body.style.overflow = '';
      _this.resetScrollbar();
      // this.resetAdjustments();
    }, _this.close = function (e) {
      _this.props.onClose(e);
    }, _this.checkScrollbar = function () {
      var fullWindowWidth = window.innerWidth;
      if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
      }
      _this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
      if (_this.bodyIsOverflowing) {
        _this.scrollbarWidth = _tool2.default.getScrollBarSize();
      }
    }, _this.resetScrollbar = function () {
      document.body.style.paddingRight = '';
    }, _this.adjustDialog = function () {
      if (_this.wrapRef && _this.scrollbarWidth !== undefined) {
        var modalIsOverflowing = _this.wrapRef.scrollHeight > document.documentElement.clientHeight;
        _this.wrapRef.style.paddingLeft = (!_this.bodyIsOverflowing && modalIsOverflowing ? _this.scrollbarWidth : '') + 'px';
        _this.wrapRef.style.paddingRight = (_this.bodyIsOverflowing && !modalIsOverflowing ? _this.scrollbarWidth : '') + 'px';
      }
    }, _this.resetAdjustments = function () {
      if (_this.wrapRef) {
        _this.wrapRef.style.paddingLeft = _this.wrapRef.style.paddingLeft = '';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Dialog.prototype.componentWillMount = function componentWillMount() {
    this.inTransition = false;
    this.titleId = 'dialogTitle' + uuid++;
  };

  Dialog.prototype.componentDidMount = function componentDidMount() {
    this.componentDidUpdate({});
  };

  Dialog.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var props = this.props;
    var mousePosition = this.props.mousePosition;

    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.openTime = Date.now();
        this.lastOutSideFocusNode = document.activeElement;
        this.addScrollingEffect();
        this.wrapRef.focus();
        var dialogNode = _reactDom2.default.findDOMNode(this.dialogRef);
        if (mousePosition) {
          var elOffset = offset(dialogNode);
          _tool2.default.setTransformOrigin(dialogNode, mousePosition.x - elOffset.left + 'px ' + (mousePosition.y - elOffset.top) + 'px');
        } else {
          _tool2.default.setTransformOrigin(dialogNode, '');
        }
      }
    } else if (prevProps.visible) {
      this.inTransition = true;
      if (props.mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }
        this.lastOutSideFocusNode = null;
      }
    }
  };

  Dialog.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.props.visible || this.inTransition) {
      this.removeScrollingEffect();
    }
  };
  // getElement = part => this.refs[part]


  Dialog.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        title = _props.title,
        prefixCls = _props.prefixCls,
        maskClosable = _props.maskClosable,
        visible = _props.visible,
        wrapClassName = _props.wrapClassName,
        wrapProps = _props.wrapProps;

    var style = this.getWrapStyle();
    // clear hide display
    // and only set display after async anim, not here for hide
    if (visible) {
      style.display = null;
    }
    return _react2.default.createElement(
      'div',
      null,
      this.getMaskElement(),
      _react2.default.createElement(
        'div',
        _extends({
          tabIndex: -1,
          onKeyDown: this.onKeyDown,
          className: prefixCls + '-wrap ' + (wrapClassName || ''),
          ref: function ref(i) {
            _this2.wrapRef = i;
          },
          onClick: maskClosable ? this.onMaskClick : undefined,
          role: 'dialog',
          'aria-labelledby': title ? this.titleId : null,
          style: style
        }, wrapProps),
        this.getDialogElement()
      )
    );
  };

  return Dialog;
}(_react2.default.Component);

Dialog.defaultProps = {
  afterClose: _tool2.default.noop,
  className: '',
  mask: true,
  visible: false,
  keyboard: true,
  closable: true,
  maskClosable: true,
  prefixCls: 'ns-dialog',
  onClose: _tool2.default.noop
};
exports.default = Dialog;