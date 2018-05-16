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

var _fego = require('fego');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onPrevOneClick = function () {
      _this.onPrev(1);
    };

    _this.onNextOneClick = function () {
      _this.onNext(1);
    };

    var page = props.page,
        defaultPage = props.defaultPage,
        defaultPageSize = props.defaultPageSize,
        total = props.total;

    var curPage = page === undefined ? defaultPage : page;
    var curPageSize = defaultPageSize;
    var totalPage = Math.ceil(total / curPageSize);

    curPage <= 0 && (curPage = 1);
    curPage > totalPage && (curPage = totalPage);

    _this.state = {
      totalPage: totalPage,
      curPage: curPage,
      curPageSize: curPageSize
    };
    return _this;
  }

  Pagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var page = nextProps.page,
        total = nextProps.total;

    var _state = {};

    if (page !== undefined && page !== this.props.page) {
      _state.curPage = page;
    }

    if (total !== this.props.total) {
      _state.totalPage = Math.ceil(total / this.state.curPageSize);
    }

    this.setState(_state);
  };

  Pagination.prototype.onPageChange = function onPageChange(curPage) {
    if (curPage === this.state.curPage) return; // 页码没变的话不触发onChange
    this.props.page === undefined && this.setState({
      curPage: curPage
    });
    this.props.onChange(curPage, this.state.curPageSize);
  };

  Pagination.prototype.onPrev = function onPrev(step) {
    var curPage = this.state.curPage;


    if (curPage - step < 1) return;

    this.onPageChange(curPage - step);
  };

  Pagination.prototype.onNext = function onNext(step) {
    var _state2 = this.state,
        curPage = _state2.curPage,
        totalPage = _state2.totalPage;


    if (curPage + step > totalPage) return;

    this.onPageChange(curPage + step);
  };

  Pagination.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        className = _props.className,
        style = _props.style,
        size = _props.size,
        total = _props.total,
        prevText = _props.prevText,
        nextText = _props.nextText;
    var _state3 = this.state,
        curPage = _state3.curPage,
        totalPage = _state3.totalPage;

    var prevBtnDisabled = totalPage === 0 || curPage === 1;
    var nextBtnDisabled = totalPage === 0 || curPage === totalPage;

    if (total < 0) return null;

    return _react2.default.createElement(
      'div',
      {
        unselectable: 'unselectable',
        className: (0, _classnames2.default)(prefixCls, className, (_classNames = {}, _classNames[prefixCls + '-sm'] = size === 'small', _classNames[prefixCls + '-lg'] = size === 'large', _classNames)),
        style: style
      },
      _react2.default.createElement(
        'div',
        { className: prefixCls + '-prev' },
        _react2.default.createElement(
          _fego.Button,
          { onClick: this.onPrevOneClick, size: size, disabled: prevBtnDisabled },
          _react2.default.createElement(_fego.Icon, { name: 'back' }),
          ' ',
          prevText
        )
      ),
      _react2.default.createElement(
        'div',
        { className: prefixCls + '-item' },
        _react2.default.createElement(
          'span',
          { className: prefixCls + '-item-active' },
          curPage
        ),
        ' / ',
        totalPage
      ),
      _react2.default.createElement(
        'div',
        { className: prefixCls + '-next' },
        _react2.default.createElement(
          _fego.Button,
          { onClick: this.onNextOneClick, size: size, disabled: nextBtnDisabled },
          nextText,
          ' ',
          _react2.default.createElement(_fego.Icon, { name: 'right-arrow' })
        )
      )
    );
  };

  return Pagination;
}(_react.Component);

Pagination.defaultProps = {
  // 前缀
  prefixCls: 'ns-pagination',
  // 页码改变的回调，参数为改变后的页码以及每页条数
  onChange: function onChange(curPage, curPageSize) {},
  // 非受控属性，当前页数
  defaultPage: 1,
  // 数据总数
  total: 0,
  // 组件尺寸
  size: 'default',
  // 默认的每页条数
  defaultPageSize: 10,
  // 上一页文案
  prevText: '上一页',
  // 下一页文案
  nextText: '下一页'
};
Pagination.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-pagination']),
  // 页码改变的回调，参数为改变后的页码以及每页条数
  onChange: _propTypes2.default.func,
  // 受控属性，当前页数，需搭配 onChange 使用
  page: _propTypes2.default.number,
  // 非受控属性，当前页数
  defaultPage: _propTypes2.default.number,
  // 数据总数
  total: _propTypes2.default.number,
  // 组件尺寸
  size: _propTypes2.default.oneOf(['small', 'default', 'large']),
  // 非受控属性，默认的每页条数
  defaultPageSize: _propTypes2.default.number,
  // 上一页文案
  prevText: _propTypes2.default.node,
  // 下一页文案
  nextText: _propTypes2.default.node
};
exports.default = Pagination;