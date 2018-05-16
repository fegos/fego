'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxGroup = function (_Component) {
  _inherits(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onChange = function (e) {
      var _e$target = e.target,
          value = _e$target.value,
          checked = _e$target.checked;
      var onChange = _this.props.onChange;

      var valueArr = _this.updateValueArr(value, checked);

      if (!('value' in _this.props)) {
        _this.setState({
          valueArr: valueArr
        });
      }
      onChange instanceof Function && onChange(valueArr);
    };

    _this.state = {
      valueArr: 'value' in props ? props.value : props.defaultValue
    };
    return _this;
  }

  CheckboxGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value.toString() !== this.props.value.toString()) {
      this.setState({
        valueArr: nextProps.value
      });
    }
  };

  CheckboxGroup.prototype.updateValueArr = function updateValueArr(value, checked) {
    var valueArr = this.state.valueArr;


    if (checked) {
      valueArr.push(value);
    } else {
      var index = valueArr.indexOf(value);
      valueArr.splice(index, 1);
    }

    return valueArr;
  };

  CheckboxGroup.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        style = _props.style,
        name = _props.name,
        children = _props.children,
        options = _props.options;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('' + prefixCls, className), style: style },
      children ? _react2.default.Children.map(children, function (child) {
        return _react2.default.cloneElement(child, {
          name: name,
          checked: _this2.state.valueArr.indexOf(child.props.value) >= 0,
          onChange: _this2.onChange
        });
      }) : options.map(function (opt) {
        return _react2.default.createElement(
          _index2.default,
          {
            key: opt.value,
            value: opt.value,
            name: name,
            checked: _this2.state.valueArr.indexOf(opt.value) >= 0,
            onChange: _this2.onChange,
            disabled: opt.disabled
          },
          opt.label
        );
      })
    );
  };

  return CheckboxGroup;
}(_react.Component);

CheckboxGroup.defaultProps = {
  // 前缀
  prefixCls: 'ns-checkbox-group',
  // 非受控属性，默认选中的值
  defaultValue: []
};
CheckboxGroup.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-checkbox-group']),
  // checkboxGroup 下所有 input[type="checkbox"] 的 name 属性
  name: _propTypes2.default.string.isRequired,
  // 受控属性，当前选中的值
  value: _propTypes2.default.array,
  // 非受控属性，默认选中的值
  defaultValue: _propTypes2.default.array,
  // 选项变化时的回调函数
  onChange: _propTypes2.default.func,
  // 子元素
  children: _propTypes2.default.node,
  // 以配置形式设置子元素
  options: _propTypes2.default.arrayOf(_propTypes2.default.object)
};
exports.default = CheckboxGroup;