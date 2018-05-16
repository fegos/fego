'use strict';

exports.__esModule = true;

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

var FormBtns = function (_Component) {
  _inherits(FormBtns, _Component);

  function FormBtns(props) {
    _classCallCheck(this, FormBtns);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {};
    return _this;
  }

  FormBtns.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        children = _props.children,
        formLayout = _props.formLayout,
        itemLayout = _props.itemLayout;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(prefixCls + '-wrapper', (_classNames = {}, _classNames[prefixCls + '-left-offset'] = formLayout === 'vertical' && itemLayout === 'horizontal', _classNames[prefixCls + '-right'] = formLayout === 'horizontal', _classNames[prefixCls + '-top-offset'] = itemLayout === 'vertical', _classNames[prefixCls + '-top-correct'] = formLayout === 'horizontal' && itemLayout === 'horizontal', _classNames))
      },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('' + prefixCls) },
        children
      )
    );
  };

  return FormBtns;
}(_react.Component);

FormBtns.displayName = 'FormBtns';
FormBtns.defaultProps = {
  // 前缀
  prefixCls: 'ns-form-btns',
  // form的布局方式
  formLayout: 'vertical',
  // 表单项的布局方式，当为vertical时，按钮应该距控件而非label在同一水平线
  itemLayout: 'vertical'
};
FormBtns.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-form-btns']),
  // form的布局方式
  formLayout: _propTypes2.default.oneOf(['vertical', 'horizontal', 'horizontal-inline']),
  // 表单项的布局方式，当为vertical时，按钮应该距控件而非label在同一水平线
  itemLayout: _propTypes2.default.oneOf(['vertical', 'horizontal'])
};
exports.default = FormBtns;