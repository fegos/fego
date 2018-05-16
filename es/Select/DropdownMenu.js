'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _KeyCode = require('../common/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownMenu = function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onKeyDown = function (e) {
      var keyCode = e.nativeEvent.keyCode;
      var activeValue = _this.state.activeValue;
      /**
       * 1. enter: 选中
       * 2. up: 上移
       * 3. down: 下移
       * 上下移过程中需注意：
       *    1. menu 的头尾边界
       *    2. item 的 disabled 与否
       */

      if (keyCode === _KeyCode2.default.ENTER) {
        var activeItem = _this.menuItems.filter(function (m) {
          return m.value === activeValue;
        })[0];
        _this.props.onChange(activeItem.value, activeItem.label);
      } else if (keyCode === _KeyCode2.default.DOWN || keyCode === _KeyCode2.default.UP) {
        _this.setState({
          activeValue: _this.getNextActiveValue(keyCode)
        });
      }
    };

    _this.onChange = function (selectedValue, selectedLabel) {
      _this.setState({
        activeValue: selectedValue
      });
      _this.props.onChange(selectedValue, selectedLabel);
    };

    _this.state = {
      activeValue: _this.getActiveValue(props)
    };
    return _this;
  }

  // componentWillReceiveProps(nextProps) {
  //   if ('selectedValue' in nextProps && nextProps.selectedValue !== this.props.selectedValue) {
  //     this.setState({
  //       selectedValue: this.getActiveValue(nextProps),
  //     });
  //   }
  // }

  DropdownMenu.prototype.getNextActiveValue = function getNextActiveValue(keyCode) {
    var activeValue = this.state.activeValue;

    var activeItem = this.menuItems.filter(function (m) {
      return m.value === activeValue;
    })[0];
    var index = activeItem.index;

    var len = this.menuItems.length;
    var flag = true;
    var nextActiveValue = '';

    while (flag) {
      index = keyCode === _KeyCode2.default.DOWN ? index + 1 : index - 1;
      if (!this.menuItems[index % len].disabled) {
        flag = false;
        nextActiveValue = this.menuItems[index % len].value;
      }
    }

    return nextActiveValue;
  };

  DropdownMenu.prototype.getMenuItems = function getMenuItems(props) {
    var children = props.children;

    var arr = [];
    _react2.default.Children.forEach(children, function (child, index) {
      arr.push({
        value: child.props.value,
        label: child.props.children,
        disabled: child.props.disabled,
        index: index
      });
    });
    return arr;
  };

  DropdownMenu.prototype.getActiveValue = function getActiveValue(props) {
    this.menuItems = this.getMenuItems(props);

    var selectedValue = props.selectedValue;
    // 有选中的值，则 active 态的项为选中的项，否则为第一个非 disabled 的项

    return selectedValue || this.menuItems.filter(function (m) {
      return !m.disabled;
    })[0].value || '';
  };

  DropdownMenu.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        children = _props.children,
        selectedValue = _props.selectedValue,
        show = _props.show;


    return _react2.default.createElement(
      'ul',
      { className: prefixCls + '-menu', onKeyDown: this.onKeyDown },
      _react2.default.Children.map(children, function (child) {
        return _react2.default.cloneElement(child, {
          active: show && child.props.value === _this2.state.activeValue,
          selected: child.props.value === selectedValue,
          prefixCls: prefixCls + '-menu-item',
          onChange: _this2.onChange
        });
      })
    );
  };

  return DropdownMenu;
}(_react.Component);

DropdownMenu.defaultProps = {
  // 点击回调
  onChange: function onChange() {}
};
DropdownMenu.propTypes = {
  prefixCls: _propTypes2.default.string.isRequired,
  // 当前下拉框的值
  selectedValue: _propTypes2.default.string,
  // 下拉框的下拉选项 Options
  children: _propTypes2.default.node,
  // 点击回调
  onChange: _propTypes2.default.func,
  // 当前是否处于展开状态
  show: _propTypes2.default.bool
};
exports.default = DropdownMenu;