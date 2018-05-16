'use strict';

exports.__esModule = true;

var _FormItem$propTypes;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = function (_Component) {
  _inherits(FormItem, _Component);

  function FormItem(props) {
    _classCallCheck(this, FormItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      /**
       * 当无 initialValue 时对应的值为 undefined,
       * 由于 input 等组件认为当 value 为 undefined 时使用的是非受控属性 initialValue
       * 因此需要指定默认值，eg: ''
       * componentWillReceiveProps 同理
       */
      value: props.value || ''
    };
    return _this;
  }

  FormItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value || ''
      });
    }
  };

  FormItem.prototype.onChange = function onChange(val) {
    var _props = this.props,
        onFieldsChange = _props.onFieldsChange,
        name = _props.name;

    onFieldsChange(name, val);
  };

  FormItem.prototype.isRequired = function isRequired() {
    var required = this.props.required;

    if (required !== undefined) {
      return required;
    }
    var rules = this.props.rules;

    if (rules) {
      return rules.filter(function (rule) {
        return rule.required;
      }).length > 0;
    }

    return false;
  };
  /**
   * 渲染 label 标签
   */


  FormItem.prototype.renderLabel = function renderLabel() {
    var _classNames;

    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        label = _props2.label,
        labelCol = _props2.labelCol,
        colon = _props2.colon,
        name = _props2.name;
    var context = this.context;

    var required = this.isRequired();

    var labelColClassName = (0, _classnames2.default)(prefixCls + '-label', labelCol && labelCol.className);
    var labelClassName = (0, _classnames2.default)((_classNames = {}, _classNames[prefixCls + '-required'] = required, _classNames));

    var labelChildren = label;
    var haveColon = colon && !context.vertical;
    // 移除用户自己输入的冒号，冒号由 label 的 after 画
    if (haveColon && typeof label === 'string' && label.trim() !== '') {
      labelChildren = label.replace(/[：|:]\s*$/, '');
    }

    return label ? _react2.default.createElement(
      'div',
      _extends({}, labelCol, { className: labelColClassName, key: 'label' }),
      _react2.default.createElement(
        'label',
        {
          htmlFor: name,
          className: labelClassName,
          title: typeof label === 'string' ? label : '',
          onClick: this.onLabelClick
        },
        labelChildren
      )
    ) : null;
  };
  /**
   * 渲染控件
   */


  FormItem.prototype.renderWrapper = function renderWrapper(children) {
    var _props3 = this.props,
        prefixCls = _props3.prefixCls,
        wrapperCol = _props3.wrapperCol;

    return _react2.default.createElement(
      'div',
      _extends({
        key: 'wrapper'
      }, wrapperCol, {
        className: (0, _classnames2.default)(prefixCls + '-control-wrapper', wrapperCol && wrapperCol.className)
      }),
      children
    );
  };

  FormItem.prototype.renderValidateWrapper = function renderValidateWrapper(c1, c2, c3) {
    var classes = '';
    var form = this.context.form;
    var props = this.props;

    var validateStatus = props.validateStatus === undefined && form ? this.getValidateStatus() : props.validateStatus;

    if (validateStatus) {
      classes = (0, _classnames2.default)({
        'has-feedback': props.hasFeedback,
        'has-success': validateStatus === 'success',
        'has-warning': validateStatus === 'warning',
        'has-error': validateStatus === 'error',
        'is-validating': validateStatus === 'validating'
      });
    }
    return _react2.default.createElement(
      'div',
      { className: props.prefixCls + '-control ' + classes },
      c1,
      c2,
      c3
    );
  };

  FormItem.prototype.renderChildren = function renderChildren() {
    var _this2 = this;

    var _props4 = this.props,
        children = _props4.children,
        name = _props4.name;
    var value = this.state.value;


    var _children = _react2.default.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, {
        value: value,
        id: name, // 给控件指定id,达到点击 label 控件能获得焦点的效果
        onChange: function onChange(val) {
          // 允许控件自己监听 onChange 事件
          child.props.onChange instanceof Function && child.props.onChange(val);
          _this2.onChange(val);
        }
      });
    });
    return [this.renderLabel(),
    // this.renderWrapper(
    //   this.renderValidateWrapper(
    //     _children,
    //     // this.renderHelp(),
    //     // this.renderExtra(),
    //   ),
    // ),
    this.renderWrapper(this.renderValidateWrapper(_children))];
  };

  FormItem.prototype.render = function render() {
    var _classNames2;

    var _props5 = this.props,
        prefixCls = _props5.prefixCls,
        className = _props5.className,
        style = _props5.style,
        horizontal = _props5.horizontal;


    return (
      // wrapper 只负责样式上的宽度
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls + '-wrapper') },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('' + prefixCls, className, (_classNames2 = {}, _classNames2[prefixCls + '-horizontal'] = horizontal, _classNames2[prefixCls + '-vertical'] = !horizontal, _classNames2)),
            style: style
          },
          this.renderChildren()
        )
      )
    );
  };

  return FormItem;
}(_react.Component);

FormItem.displayName = 'FormItem';
FormItem.defaultProps = {
  prefixCls: 'ns-form-item',
  colon: true,
  onFieldsChange: function onFieldsChange() {},
  horizontal: false
};
FormItem.propTypes = (_FormItem$propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-form-item']),
  // 表单项值发生变化时的回调
  onFieldsChange: _propTypes2.default.func,
  // 表单域唯一标识
  name: _propTypes2.default.string,
  // 是否为必填项, 若不设置，会从 rules 中提取
  required: _propTypes2.default.bool,
  // 表单域初始值
  initialValue: _propTypes2.default.any,
  // label 和 控件 是否成水平布局,由 form 的 itemLayout 决定
  horizontal: _propTypes2.default.bool,
  // 是否显示 label 后面的冒号
  colon: _propTypes2.default.bool,
  // 标签的文本
  label: _propTypes2.default.node,
  // 是否显示 label 后面的冒号
  hasFeedback: _propTypes2.default.bool,
  /**
   * 布局对象，接受属性如下
   * {
    * width: 4 / '100px'
    * labelCol: 4
    * wrapperCol: 4
   * }
   */
  layout: _propTypes2.default.object,
  // 表单项宽
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  // itemLayout 为 horizontal 时，label 占的比例，使用
  labelCol: _propTypes2.default.number,
  // itemLayout 为 horizontal 时，控件 占的比例，
  wrapperCol: _propTypes2.default.number
}, _FormItem$propTypes['wrapperCol'] = _propTypes2.default.number, _FormItem$propTypes.rules = _propTypes2.default.arrayOf(_propTypes2.default.object), _FormItem$propTypes);
exports.default = FormItem;