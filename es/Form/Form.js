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

var _api = require('./api');

var _FormItem = require('./FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

var _FormBtns = require('./FormBtns');

var _FormBtns2 = _interopRequireDefault(_FormBtns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onSubmit = function (e) {
      e.preventDefault();
      _this.props.onSubmit(_this.state.curValue);
    };

    _this.onReset = function (e) {
      e.preventDefault();
      _this.setState({
        curValue: _this.initialValue
      });
      _this.props.onReset(e);
    };

    _this.onFieldsChange = function (name, value) {
      var obj = {};
      obj[name] = value;
      var newValue = Object.assign({}, _this.state.curValue, obj);
      _this.setState({
        curValue: newValue
      });
    };

    var values = _this.getInitialValues(props);
    _this.state = {
      curValue: values
    };
    _this.initialValue = values;
    return _this;
  }

  Form.prototype.getInitialValues = function getInitialValues(props) {
    var children = props.children;

    var values = {};
    _react2.default.Children.forEach(children, function (child) {
      var _props = child.props,
          type = child.type;

      if (type.displayName === 'FormItem') {
        values[_props.name] = _props.initialValue;
      }
    });
    return values;
  };

  Form.prototype.getFieldsValue = function getFieldsValue() {
    console.log('调用Form的getFieldsValue函数');
    return this.state.curValue;
  };

  Form.prototype.render = function render() {
    var _classNames,
        _this2 = this;

    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        classNmae = _props2.classNmae,
        style = _props2.style,
        children = _props2.children,
        layout = _props2.layout,
        itemLayout = _props2.itemLayout,
        hideRequiredMark = _props2.hideRequiredMark;

    return _react2.default.createElement(
      'form',
      {
        className: (0, _classnames2.default)('' + prefixCls, classNmae, (_classNames = {}, _classNames[prefixCls + '-vertical'] = layout === 'vertical', _classNames[prefixCls + '-horizontal f-cb'] = layout === 'horizontal', _classNames[prefixCls + '-horizontal'] = layout === 'horizontal-inline', _classNames[prefixCls + '-hide-required-mark'] = hideRequiredMark, _classNames)),
        style: style,
        onSubmit: this.onSubmit,
        onReset: this.onReset
      },
      _react2.default.Children.map(children, function (child) {
        var _props = child.props,
            type = child.type;


        if (type.displayName === 'FormItem') {
          return _react2.default.cloneElement(child, {
            horizontal: itemLayout === 'horizontal',
            onFieldsChange: _this2.onFieldsChange,
            value: _this2.state.curValue[_props.name]
          });
        } else if (type.displayName === 'FormBtns') {
          return _react2.default.cloneElement(child, {
            formLayout: layout,
            itemLayout: itemLayout
          });
        }
        return null;
      })
    );
  };

  return Form;
}(_react.Component);

Form.create = _api.create;
Form.defaultProps = {
  prefixCls: 'ns-form',
  // 表单整体布局方式
  layout: 'vertical',
  // 单个表单项的布局方式
  itemLayout: 'vertical',
  // 是否隐藏所有表单项的必选标记，默认 false
  hideRequiredMark: false,
  // 提交表单回调
  onSubmit: function onSubmit() {},
  // 重置表单回调
  onReset: function onReset() {}
};
Form.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-form']),
  /**
   * 表单整体布局方式
   * vertical: 垂直排列
   * horizontal/horizontal-inline: 水平排列
   *
   * horizontal vs horizontal-inline:
   * horizontal：表单项水平排列，按钮居右
   * horizontal-inline：表单项水平排列，按钮尾随
   */
  layout: _propTypes2.default.oneOf(['vertical', 'horizontal', 'horizontal-inline']),
  /**
   * 单个表单项的布局方式
   * vertical: label 和 控件 呈垂直布局
   * horizontal: label 和 控件 呈水平布局
   */
  itemLayout: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  // 是否隐藏所有表单项的必选标记，默认 false
  hideRequiredMark: _propTypes2.default.bool,
  // 提交表单回调
  onSubmit: _propTypes2.default.func,
  // 重置表单回调
  onReset: _propTypes2.default.func
};
exports.default = Form;


Form.Item = _FormItem2.default;
Form.Btns = _FormBtns2.default;