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

var _KeyCode = require('../common/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _Select2.default.Option;

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var page = props.page,
        defaultPage = props.defaultPage,
        pageSize = props.pageSize,
        defaultPageSize = props.defaultPageSize,
        total = props.total;

    var curPage = page === undefined ? defaultPage : page;
    var curPageSize = pageSize === undefined ? defaultPageSize : pageSize;
    var totalPage = Math.ceil(total / curPageSize);

    curPage <= 0 && (curPage = 1);
    curPage > totalPage && (curPage = totalPage);

    _this.state = {
      totalPage: totalPage,
      curPage: curPage,
      curPageSize: curPageSize
    };

    props.showPageSizeChanger && _this.handlePageSizeOptions(props.pageSizeOptions);
    return _this;
  }

  Pagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var page = nextProps.page,
        pageSize = nextProps.pageSize,
        total = nextProps.total;

    var _state = {};

    if (page !== undefined && page !== this.props.page) {
      _state.curPage = page;
    }

    if (pageSize !== undefined && pageSize !== this.props.pageSize) {
      var newPageSize = parseInt(pageSize, 10);
      var curPage = _state.curPage || this.state.curPage;
      // 这个地方有个问题就是，万一pageSize和total都变了，那么这里就不该用外层的nextprops.total了,按理说应该不会俩同时变吧
      var newTotalPage = Math.ceil(total / newPageSize);
      var ifCurPageChange = curPage > newTotalPage;
      var newCurPage = ifCurPageChange ? newTotalPage : curPage;

      _state.totalPage = newTotalPage;
      _state.curPageSize = newPageSize;

      if (this.props.page === undefined) {
        // 非受控属性才自动更新 curPage 的值
        _state.curPage = newCurPage;
      }

      ifCurPageChange && this.props.onChange(newCurPage, newPageSize);
    }

    if (total !== this.props.total) {
      var ps = _state.curPageSize || this.state.curPageSize;
      _state.totalPage = Math.ceil(total / ps);
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

  Pagination.prototype.getInputPage = function getInputPage() {
    var value = this.inputRef.value;

    var page = parseInt(value, 10);
    var totalPage = this.state.totalPage;


    if (/^\s*$/.test(value) || /\D/g.test(value) || page < 1) {
      return 0;
    }
    return page > totalPage ? totalPage : page;
  };

  Pagination.prototype.handlePageSizeOptions = function handlePageSizeOptions(options) {
    var pageSizeOptionFormat = this.props.pageSizeOptionFormat;

    this.pageSizeOptions = [];
    this.pageSizeOptions = options.map(function (opt) {
      return {
        value: typeof opt === 'number' ? opt.toString() : opt,
        label: pageSizeOptionFormat.replace(/^\${pageSize}/, opt)
      };
    });
  };

  /**
   * @memberof Pagination
   * 用于渲染出数据总量和当前数据顺序
   */


  Pagination.prototype.renderTotal = function renderTotal() {
    var _props = this.props,
        showTotal = _props.showTotal,
        prefixCls = _props.prefixCls,
        total = _props.total;
    var _state3 = this.state,
        curPage = _state3.curPage,
        curPageSize = _state3.curPageSize;

    var curShowMax = curPage * curPageSize;
    var range = [curShowMax - curPageSize + 1, curShowMax > total ? total : curShowMax];

    if (!showTotal) {
      return null;
    } else {
      var totalCnt = showTotal instanceof Function ? showTotal(total, range, curPage, curPageSize) : '\u603B\u5171' + total + '\u6761\u6570\u636E';
      return _react2.default.createElement(
        'li',
        { className: prefixCls + '-total-text' },
        totalCnt
      );
    }
  };

  /**
   * @memberof Pagination
   * 用于渲染出 '指定每页可以显示多少条'、'是否可以快速跳转至某页' 区域
   */


  Pagination.prototype.renderOptions = function renderOptions() {
    var _this2 = this;

    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        showJumper = _props2.showJumper,
        jumperText = _props2.jumperText,
        showPageSizeChanger = _props2.showPageSizeChanger,
        size = _props2.size;


    if (!showJumper && !showPageSizeChanger) {
      return null;
    } else {
      var jumperEl = null;
      var optionEl = null;
      var prefix = prefixCls + '-options';

      if (showJumper) {
        jumperEl = _react2.default.createElement(
          'div',
          { className: prefix + '-jumper' },
          _react2.default.createElement(
            'span',
            null,
            jumperText
          ),
          _react2.default.createElement('input', { type: 'text', ref: function ref(i) {
              _this2.inputRef = i;
            }, onKeyUp: this.onJumperIptKeyUp })
        );
      }
      if (showPageSizeChanger) {
        var curPageSize = this.state.curPageSize;

        var val = typeof curPageSize === 'number' ? curPageSize.toString() : curPageSize;

        optionEl = _react2.default.createElement(
          'div',
          { className: prefix + '-size-changer' },
          _react2.default.createElement(
            _Select2.default,
            {
              className: prefixCls + '-select',
              siez: size,
              defaultValue: val,
              onChange: this.onPageSizeChange
            },
            this.pageSizeOptions.map(function (opt) {
              return _react2.default.createElement(
                Option,
                { value: opt.value, key: opt.value },
                opt.label
              );
            })
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: prefix },
        optionEl,
        jumperEl
      );
    }
  };

  Pagination.prototype.render = function render() {
    var _this3 = this,
        _classNames,
        _classNames2,
        _classNames3;

    var _props3 = this.props,
        prefixCls = _props3.prefixCls,
        className = _props3.className,
        style = _props3.style,
        size = _props3.size,
        total = _props3.total;
    var _state4 = this.state,
        curPage = _state4.curPage,
        totalPage = _state4.totalPage;

    var pageArr = [];

    if (total < 0) return null;

    // 处理页码项
    var start = void 0;
    var end = void 0;
    var front = void 0;
    var tail = void 0;
    var itemClass = void 0;
    if (totalPage <= 10) {
      start = 1;
      end = totalPage;
      front = false;
      tail = false;
    } else if (curPage <= 4) {
      start = 1;
      end = curPage === 4 ? 6 : 5;
      front = false;
      tail = true;
    } else if (curPage >= totalPage - 3) {
      start = curPage === totalPage - 3 ? totalPage - 5 : totalPage - 4;
      end = totalPage;
      front = true;
      tail = false;
    } else {
      start = curPage - 2;
      end = curPage + 2;
      front = true;
      tail = true;
    }

    if (front) {
      pageArr.push(_react2.default.createElement(
        'li',
        { title: '1', className: prefixCls + '-item', key: 1, onClick: function onClick() {
            _this3.onPageChange(1);
          } },
        _react2.default.createElement(
          'span',
          null,
          1
        )
      ));
      pageArr.push(_react2.default.createElement('li', { title: '\u5411\u524D5\u9875', className: prefixCls + '-jump-prev', key: 'prev5', onClick: this.onPrevFiveClick }));
    }

    var _loop = function _loop(i) {
      itemClass = (0, _classnames2.default)(prefixCls + '-item', i === curPage ? prefixCls + '-item-active' : '');
      pageArr.push(_react2.default.createElement(
        'li',
        { title: '' + i, className: itemClass, key: i, onClick: function onClick() {
            _this3.onPageChange(i);
          } },
        _react2.default.createElement(
          'span',
          null,
          i
        )
      ));
    };

    for (var i = start; i <= end; i++) {
      _loop(i);
    }
    if (tail) {
      pageArr.push(_react2.default.createElement('li', { title: '\u5411\u540E5\u9875', className: prefixCls + '-jump-next', key: 'next5', onClick: this.onNextFiveClick }));
      pageArr.push(_react2.default.createElement(
        'li',
        { title: '' + totalPage, className: prefixCls + '-item', key: totalPage, onClick: function onClick() {
            _this3.onPageChange(totalPage);
          } },
        _react2.default.createElement(
          'span',
          null,
          totalPage
        )
      ));
    }

    return _react2.default.createElement(
      'ul',
      {
        unselectable: 'unselectable',
        className: (0, _classnames2.default)(prefixCls, className, (_classNames = {}, _classNames[prefixCls + '-sm'] = size === 'small', _classNames[prefixCls + '-lg'] = size === 'large', _classNames)),
        style: style
      },
      this.renderTotal(),
      _react2.default.createElement(
        'li',
        {
          title: '\u4E0A\u4E00\u9875',
          className: (0, _classnames2.default)(prefixCls + '-prev', (_classNames2 = {}, _classNames2[prefixCls + '-prev-disabled'] = totalPage === 0 || curPage === 1, _classNames2)),
          onClick: this.onPrevOneClick
        },
        _react2.default.createElement(
          'span',
          null,
          '<'
        )
      ),
      pageArr,
      _react2.default.createElement(
        'li',
        {
          title: '\u4E0B\u4E00\u9875',
          className: (0, _classnames2.default)(prefixCls + '-next', (_classNames3 = {}, _classNames3[prefixCls + '-next-disabled'] = totalPage === 0 || curPage === totalPage, _classNames3)),
          onClick: this.onNextOneClick
        },
        _react2.default.createElement(
          'span',
          null,
          '>'
        )
      ),
      this.renderOptions()
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
  // 是否显示总数和当前数据顺序，参数为数据总数以及当前显示的数据范围
  showTotal: false,
  // 是否显示快速跳转至某页
  showJumper: false,
  // 快速跳转至某页的文案
  jumperText: '跳转至',
  // 默认的每页条数
  defaultPageSize: 10,
  // 是否显示可以改变 PageSize 的下拉框
  showPageSizeChanger: false,
  // PageSize 的下拉框的选项值
  pageSizeOptions: [10, 30, 50],
  // PageSize 的下拉框显示的格式
  pageSizeOptionFormat: '${pageSize}条/页',
  // PageSize 变化的回调
  onPageSizeChange: function onPageSizeChange(curPage, newPageSize) {}
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
  // 是否显示总数和当前数据顺序，参数为数据总数以及当前显示的数据范围
  showTotal: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  // 是否显示快速跳转至某页
  showJumper: _propTypes2.default.bool,
  // 快速跳转至某页的文案
  jumperText: _propTypes2.default.string,
  // 非受控属性，默认的每页条数
  defaultPageSize: _propTypes2.default.number,
  // 受控属性，每页条数, 需搭配 onPageSizeChange 使用
  pageSize: _propTypes2.default.number,
  // 是否显示可以改变 PageSize 的下拉框
  showPageSizeChanger: _propTypes2.default.bool,
  // PageSize 的下拉框的选项值
  pageSizeOptions: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.arrayOf(_propTypes2.default.number)]),
  // PageSize 的下拉框显示的格式
  pageSizeOptionFormat: _propTypes2.default.string,
  // PageSize 变化的回调
  onPageSizeChange: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onJumperIptKeyUp = function (e) {
    if (e.nativeEvent.keyCode === _KeyCode2.default.ENTER) {
      var page = _this4.getInputPage();
      if (page) {
        _this4.onPageChange(page);
      }
      _this4.inputRef.value = '';
    }
  };

  this.onPageSizeChange = function (v) {
    var newPageSize = parseInt(v, 10);
    var _props4 = _this4.props,
        pageSize = _props4.pageSize,
        onPageSizeChange = _props4.onPageSizeChange;
    var curPage = _this4.state.curPage;


    if (pageSize === undefined) {
      // 非受控 pageSize
      var _props5 = _this4.props,
          total = _props5.total,
          onChange = _props5.onChange,
          page = _props5.page;

      var newTotalPage = Math.ceil(total / newPageSize);
      var ifCurPageChange = curPage > newTotalPage;
      var newCurPage = ifCurPageChange ? newTotalPage : curPage;

      var _state = {
        totalPage: newTotalPage,
        curPageSize: newPageSize
      };
      if (page === undefined) {
        // 非受控属性才自动更新 curPage 的值
        _state.curPage = newCurPage;
      }
      _this4.setState(_state);

      onPageSizeChange(newCurPage, newPageSize);
      ifCurPageChange && onChange(newCurPage, newPageSize);
    } else {
      // 受控 pageSize
      onPageSizeChange(curPage, newPageSize);
    }
  };

  this.onPrevOneClick = function () {
    _this4.onPrev(1);
  };

  this.onPrevFiveClick = function () {
    _this4.onPrev(5);
  };

  this.onNextOneClick = function () {
    _this4.onNext(1);
  };

  this.onNextFiveClick = function () {
    _this4.onNext(5);
  };
};

exports.default = Pagination;