'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _KeyCode = require('../common/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onShowDropdown = function () {
      if (_this.props.disabled) return;

      var expand = _this.state.expand;

      if (expand) {
        _this.hideDropDown();
      } else {
        _this.showDropDown();
      }
    };

    _this.onChange = function (selectedValue, selectedLabel) {
      _this.innerItemClick = true;

      var value = _this.state.value;
      var onChange = _this.props.onChange;

      var _state = {};

      if (value !== selectedValue) {
        // 更新 select 的值
        !('value' in _this.props) && (_state.value = selectedValue);
        onChange instanceof Function && onChange(selectedValue, selectedLabel);
      }

      // 收起 select
      _this.hideDropDown(_state);
    };

    _this.onClear = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation(); // 阻止点击事件冒泡

      _this.innerItemClick = true;

      var expand = _this.state.expand;
      var onChange = _this.props.onChange;

      var _state = {};

      !('value' in _this.props) && (_state.value = '');
      onChange instanceof Function && onChange('', '');

      if (expand) {
        _this.hideDropDown(_state);
      } else {
        _this.setState(_state);
      }
    };

    _this.onKeyDown = function (e) {
      var disabled = _this.props.disabled;

      if (disabled) return;

      var keyCode = e.nativeEvent.keyCode;
      var expand = _this.state.expand;
      /**
       * 1. 当前展开
       *    1.1 ESC: 收起
       *    1.2 其他: 交给 menu 自己处理
       * 2. 当前收起
       *    2.1 down: 展开
       *    2.2 enter: 展开
       */

      if (expand) {
        // 当前展开
        if (keyCode === _KeyCode2.default.ESC) {
          _this.hideDropDown();
          e.nativeEvent.preventDefault();
          e.nativeEvent.stopPropagation();
        } else {
          var menu = _this.menuRef;
          menu && menu.onKeyDown(e); // 把键盘事件传递给 menu 自己处理
          e.nativeEvent.preventDefault();
          e.nativeEvent.stopPropagation();
        }
      } else if (keyCode === _KeyCode2.default.ENTER || keyCode === _KeyCode2.default.DOWN) {
        // 当前没展开，则可以通过键盘展开菜单
        _this.showDropDown();
        e.nativeEvent.preventDefault();
      }
    };

    _this.hideDropDown = function () {
      var otherState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_this.timer) clearTimeout(_this.timer);

      _this.setState(_extends({}, otherState, {
        expand: false, // 告诉整个组件，下拉菜单要关闭了
        menuHide: false, // 显示关闭动画，300ms 再后隐藏
        menuTrans: true
      }));

      if ('focused' in otherState && !otherState.focused) {
        var onBlur = _this.props.onBlur;

        onBlur instanceof Function && onBlur();
      }

      _this.timer = setTimeout(function () {
        _this.setState({
          menuHide: true,
          menuTrans: false
        });
      }, 300);
    };

    _this.showDropDown = function () {
      var onFocus = _this.props.onFocus;
      var focused = _this.state.focused;

      !focused && onFocus instanceof Function && onFocus();
      _this.setState({
        expand: true,
        focused: true,
        menuHide: false
        // menuTrans: false,
      });
    };

    _this.listenDocClick = function () {
      if (_this.props.disabled) return;
      if (_this.innerItemClick) {
        _this.innerItemClick = false;
        return;
      }
      /**
       * document.activeElement !== this.selectRef 为 true 表明页面发生了点击，并且点击的不是自己
       */
      if (document.activeElement !== _this.selectRef) {
        var onBlur = _this.props.onBlur;
        var _this$state = _this.state,
            expand = _this$state.expand,
            focused = _this$state.focused;


        if (expand) {
          // 当前展开，则应该收起下拉，并失焦
          _this.hideDropDown({
            focused: false
          });
        } else if (focused) {
          // 当前收起，有焦点，直接失焦即可
          _this.setState({
            focused: false
          });
          onBlur instanceof Function && onBlur();
        }
      }
    };

    _this.state = {
      value: 'value' in props ? props.value : props.defaultValue,
      focused: false,
      expand: false,
      menuHide: true,
      menuTrans: false
    };
    return _this;
  }

  Select.prototype.componentDidMount = function componentDidMount() {
    document.addEventListener('click', this.listenDocClick);
  };

  Select.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  Select.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
    document.removeEventListener('click', this.listenDocClick);
  };

  Select.prototype.getLabel = function getLabel() {
    var value = this.state.value;

    if (!value) return null;

    var label = '';
    _react2.default.Children.forEach(this.props.children, function (child) {
      if (child.props.value === value) {
        label = child.props.children;
      }
    });
    return label;
  };

  Select.prototype.render = function render() {
    var _classNames,
        _this2 = this,
        _classNames2,
        _classNames3,
        _classNames4;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        style = _props.style,
        size = _props.size,
        disabled = _props.disabled,
        multiple = _props.multiple,
        showClear = _props.showClear,
        placeholder = _props.placeholder,
        children = _props.children,
        dropdownClassName = _props.dropdownClassName;
    var _state2 = this.state,
        value = _state2.value,
        expand = _state2.expand,
        menuHide = _state2.menuHide,
        menuTrans = _state2.menuTrans,
        focused = _state2.focused;

    var label = this.getLabel();

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('' + prefixCls, className, (_classNames = {}, _classNames[prefixCls + '-sm'] = size === 'small', _classNames[prefixCls + '-lg'] = size === 'large', _classNames[prefixCls + '-disabled'] = disabled, _classNames[prefixCls + '-open'] = expand, _classNames[prefixCls + '-focused'] = focused, _classNames[prefixCls + '-allow-clear'] = showClear, _classNames)),
        style: style
      },
      _react2.default.createElement(
        'div',
        {
          ref: function ref(i) {
            _this2.selectRef = i;
          },
          className: (0, _classnames2.default)(prefixCls + '-selection', (_classNames2 = {}, _classNames2[prefixCls + '-selection-multiple'] = multiple, _classNames2[prefixCls + '-selection-value'] = value, _classNames2)),
          onClick: this.onShowDropdown,
          'aria-haspopup': true,
          'aria-expanded': expand,
          'aria-autocomplete': 'list'
          // 说明：这个必须加上，不然会有bug...
          , tabIndex: 0,
          onKeyDown: this.onKeyDown
        },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-selection-inner f-cb' },
          value ? _react2.default.createElement(
            'span',
            { className: prefixCls + '-selection-selected-value' },
            label
          ) : _react2.default.createElement(
            'span',
            { className: prefixCls + '-selection-placeholder' },
            placeholder
          )
        ),
        showClear && value ? _react2.default.createElement(
          'span',
          {
            className: (0, _classnames2.default)(prefixCls + '-clear'),
            unselectable: 'unselectable',
            onClick: this.onClear
          },
          _react2.default.createElement(_Icon2.default, { name: 'no', className: prefixCls + '-icon' })
        ) : null,
        _react2.default.createElement(
          'span',
          {
            className: (0, _classnames2.default)(prefixCls + '-arrow', (_classNames3 = {}, _classNames3[prefixCls + '-arrow-up-down'] = !expand && !menuHide, _classNames3[prefixCls + '-arrow-down-up'] = expand, _classNames3)),
            unselectable: 'unselectable'
          },
          _react2.default.createElement(_Icon2.default, { name: 'back', className: prefixCls + '-icon' })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(prefixCls + '-dropdown', dropdownClassName, (_classNames4 = {}, _classNames4[prefixCls + '-dropdown-hide'] = menuHide, _classNames4[prefixCls + '-dropdown-fadeout'] = menuTrans, _classNames4))
        },
        _react2.default.createElement(
          _DropdownMenu2.default,
          {
            ref: function ref(i) {
              _this2.menuRef = i;
            },
            show: expand,
            onChange: this.onChange,
            selectedValue: value,
            prefixCls: prefixCls + '-dropdown'
          },
          children
        )
      )
    );
  };

  return Select;
}(_react.Component);

Select.defaultProps = {
  // 前缀
  prefixCls: 'ns-select',
  // 选择框大小
  size: 'default',
  // 是否显示清楚按钮
  showClear: false,
  // 是否禁用
  disabled: false
};
Select.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-select']),
  // 选择框大小
  size: _propTypes2.default.oneOf(['default', 'large', 'small']),
  // 受控属性，当前选中的项，需配合 onChange 使用
  value: _propTypes2.default.string,
  // 非受控属性，当前选中的项
  defaultValue: _propTypes2.default.string,
  // 是否显示清楚按钮
  showClear: _propTypes2.default.bool,
  // 是否禁用
  disabled: _propTypes2.default.bool,
  // 选择框 value 变化回调
  onChange: _propTypes2.default.func,
  // 获得焦点时回调
  onFocus: _propTypes2.default.func,
  // 失去焦点的时回调
  onBlur: _propTypes2.default.func,
  // 下拉菜单的 className 属性
  dropdownClassName: _propTypes2.default.string
};
exports.default = Select;


Select.Option = _Option2.default;