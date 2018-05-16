'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Pagination = require('../Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Radio = require('../Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Loading = require('../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onPaginationChange = function (page, pageSize) {
      var onChange = _this.props.onChange;

      _this.updatePagination(page, pageSize);
      onChange instanceof Function && onChange({ page: page, pageSize: pageSize }, _this.state.sorter);
    };

    _this.onPaginationPageSizeChange = function (page, pageSize) {
      _this.updatePagination(page, pageSize);
    };

    _this.onSelectAllChange = function (e) {
      _this.onSelectionChange('all', e.target.checked);
    };

    _this.state = {};

    var dataSource = _this.handleDataSource(props);

    // columns
    _this.handleColumns(props);

    // 分页
    var pagination = _this.handlePagination(props);

    // 行选择
    var rowSelection = props.rowSelection;

    var selectedRowKeys = void 0;
    rowSelection && (selectedRowKeys = _this.handleRowSelection(props));

    // colgroup
    _this.colgroupArr = _this.formatColumns.map(function (c) {
      return _react2.default.createElement('col', { key: c.key || c.dataIndex });
    });

    _this.state = _extends({}, pagination, {
      dataSource: dataSource,
      dataSourceOrg: dataSource.concat(),
      selectedRowKeys: selectedRowKeys,
      sorter: {}
    });
    return _this;
  }

  Table.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var pagination = nextProps.pagination,
        rowSelection = nextProps.rowSelection;

    var _state = {};

    if (pagination instanceof Object) {
      if ('page' in pagination && pagination.page !== this.state.page) {
        _state.page = pagination.page;
      }
      if ('pageSize' in pagination && pagination.pageSize !== this.state.pageSize) {
        _state.pageSize = pagination.pageSize;
      }
    }

    if (rowSelection instanceof Object) {
      var selectedRowKeys = this.handleRowSelection(nextProps);
      if ('selectedRowKeys' in rowSelection && rowSelection.selectedRowKeys.toString() !== this.state.selectedRowKeys.toString()) {
        _state.selectedRowKeys = selectedRowKeys;
      }
    }

    if (this.props.dataSource.toString() !== nextProps.dataSource.toString()) {
      var dataSource = this.handleDataSource(nextProps);
      var sorter = this.state.sorter;
      var column = sorter.column,
          order = sorter.order;


      _state.dataSourceOrg = dataSource.concat();
      if (column && column.sorter instanceof Function) {
        // 有需要前端排序的情况
        dataSource.sort(column.sorter);
        if (order === 'descend') dataSource.reverse();
      }
      _state.dataSource = dataSource;
    }

    this.setState(_state);
  };

  /**
   * 处理数据
   * @memberof Table
   */


  Table.prototype.handleDataSource = function handleDataSource(props) {
    var dataSource = props.dataSource,
        rowKey = props.rowKey,
        prefixCls = props.prefixCls,
        rowSelection = props.rowSelection;

    var newDataSource = dataSource.concat(); // 对原数据做了备份,因为修改了数据
    var enabledData = [];
    var disabledData = [];

    newDataSource.forEach(function (d, i) {
      var _rowKey = void 0;
      if (rowKey) {
        _rowKey = rowKey instanceof Function ? rowKey(d, i) : d[rowKey];
      } else {
        _rowKey = i;
      }
      d[prefixCls + '-rowKey'] = _rowKey;

      // 若是有行选择，则处理一下得到行选择回调时需要用到的rowKey，index
      var checkboxPropsObj = rowSelection && rowSelection.getCheckboxProps(d);
      if (checkboxPropsObj) {
        !checkboxPropsObj.disabled && enabledData.push({
          rowKey: _rowKey,
          index: i
        });
        checkboxPropsObj.disabled && disabledData.push({
          rowKey: _rowKey,
          index: i
        });
      }
    });

    rowSelection && (this.enabledRowKeyArr = enabledData, this.disabledRowKeyArr = disabledData);

    return newDataSource;
  };

  /**
   * 处理表头，得到表头最大层级数和叶子节点
   * @memberof Table
   */


  Table.prototype.handleColumns = function handleColumns(props) {
    var columns = props.columns,
        prefixCls = props.prefixCls;

    var newColumns = columns.concat(); // 备份原数据,因为对数据做了修改
    var arr = [];
    var deep = 1;

    // 遍历处理表头的深度，得到叶子节点
    function deepTraverse(col, level) {
      col.level = level;
      if (col.children) {
        var next = level + 1;
        col.children.forEach(function (cc) {
          var d = deepTraverse(cc, next);
          if (d > 0) {
            deep = d > deep ? d : deep; // 更新最大深度
          }
        });
        return -1;
      } else {
        arr.push(col);
        return level;
      }
    }

    newColumns.forEach(function (c) {
      return deepTraverse(c, 1);
    });

    this.formatColumns = arr;
    this.deep = deep;

    this.handleColumnHeader(newColumns, deep, prefixCls);
  };

  /**
   * 将 columns 转成二维数据，得到各个表头所占据的列&行数
   * @memberof Table
   */


  Table.prototype.handleColumnHeader = function handleColumnHeader(columns, deep, prefixCls) {
    var dimen2Arr = Array(deep);

    function traverse(col, level) {
      var index = level - 1;
      if (!dimen2Arr[index]) dimen2Arr[index] = [];
      dimen2Arr[index].push(col);

      if (col.children) {
        var next = level + 1;
        var cs = 0;
        col.children.forEach(function (cc) {
          var t = traverse(cc, next);
          cs += t;
        });
        col[prefixCls + '-row-span'] = 1;
        col[prefixCls + '-col-span'] = cs;
        return cs;
      } else {
        col[prefixCls + '-col-span'] = 1;
        col[prefixCls + '-row-span'] = deep - level + 1;
        return 1;
      }
    }

    columns.forEach(function (c) {
      return traverse(c, 1);
    });

    this.dimen2ColumnHeaderArr = dimen2Arr;
  };

  /** ********************分页相关********************* */
  /**
   * 预处理分页信息
   * @memberof Table
   */


  Table.prototype.handlePagination = function handlePagination(props) {
    var pagination = props.pagination;

    var page = 1;
    var pageSize = 10;

    if (pagination instanceof Object) {
      page = pagination.page || 1;
      pageSize = pagination.pageSize || 10;
    }
    return pagination ? {
      page: page,
      pageSize: pageSize
    } : {};
  };

  /**
   * 更新 Table 维护的 state 里的分页属性
   * @param {number} page
   * @param {number} pageSize
   * @memberof Table
   */


  Table.prototype.updatePagination = function updatePagination(page, pageSize) {
    var pagination = this.props.pagination;

    var _state = {};

    // 有分页条，并且没使用分页条的受控属性，table 才自己更新属性值
    if (pagination === true || pagination instanceof Object && !('page' in pagination)) {
      _state.page = page;
    }
    if (pagination === true || pagination instanceof Object && !('pageSize' in pagination)) {
      _state.pageSize = pageSize;
    }
    if (pagination) {
      this.setState(_state);
    }
  };

  /** ********************行选择相关********************* */
  /**
   * 预处理行选择信息
   * @param {object} props
   * @memberof Table
   */
  Table.prototype.handleRowSelection = function handleRowSelection(props) {
    var rowSelection = props.rowSelection;

    // 处理 type

    if (!rowSelection.type) {
      rowSelection.type = 'checkbox';
    } else if (rowSelection.type !== 'checkbox' && rowSelection.type !== 'radio') {
      console.warn('rowSelection.type expected to be \'checkbox\' or \'radio\', but got \'' + rowSelection.type + '\'');
      rowSelection.type = 'checkbox';
    }

    // 处理 selectedRowKeys
    if (!rowSelection.selectedRowKeys) {
      rowSelection.selectedRowKeys = [];
    } else if (rowSelection.type === 'radio') {
      // 有 selectedRowKeys 且为单选时，默认以第一个数据为准
      rowSelection.selectedRowKeys = rowSelection.selectedRowKeys.slice(0, 1);
    }

    // 处理 getCheckboxProps
    if (!rowSelection.getCheckboxProps) {
      rowSelection.getCheckboxProps = function () {
        return {
          disabled: false
        };
      };
    }

    return rowSelection.selectedRowKeys;
  };

  /**
   * @param {'th' or 'td'} type ：thead or tbody 的选择
   * @param {obj} record ：每一行的记录
   * @param {number or string} rowKey ：每一行的 key 值
   * @memberof Table
   */


  Table.prototype.renderSelection = function renderSelection(type, record) {
    if (type === 'th') {
      return this.renderThSelection();
    } else {
      return this.renderTdSelection(record);
    }
  };

  Table.prototype.renderThSelection = function renderThSelection() {
    var _this2 = this;

    var _props = this.props,
        rowSelection = _props.rowSelection,
        prefixCls = _props.prefixCls;
    // 找出可选择但是又没选择的行

    var len = this.enabledRowKeyArr.filter(function (k) {
      return _this2.state.selectedRowKeys.indexOf(k.rowKey) < 0;
    }).length;
    // 单选时表头不提供选择框
    return rowSelection.type === 'checkbox' ? _react2.default.createElement(
      'th',
      { rowSpan: this.deep, className: (0, _classnames2.default)(prefixCls + '-selection-column') },
      _react2.default.createElement(_Checkbox2.default, {
        type: rowSelection.type,
        name: prefixCls + '-selection-all',
        indeterminate: len > 0 && len < this.enabledRowKeyArr.length,
        onChange: this.onSelectAllChange,
        checked: len === 0
      })
    ) : _react2.default.createElement('th', { rowSpan: this.deep, className: (0, _classnames2.default)(prefixCls + '-selection-column') });
  };

  Table.prototype.renderTdSelection = function renderTdSelection(record) {
    var _this3 = this;

    var _props2 = this.props,
        rowSelection = _props2.rowSelection,
        prefixCls = _props2.prefixCls;
    var getCheckboxProps = rowSelection.getCheckboxProps;

    var checkboxPropsObj = getCheckboxProps(record);
    var rowKey = record[prefixCls + '-rowKey'];
    var Ele = rowSelection.type === 'checkbox' ? _Checkbox2.default : _Radio2.default;

    return _react2.default.createElement(
      'td',
      { className: prefixCls + '-selection-column' },
      _react2.default.createElement(Ele, _extends({
        type: rowSelection.type,
        className: prefixCls + '-selection-' + rowSelection.type,
        name: prefixCls + '-selection'
      }, checkboxPropsObj, {
        onChange: function onChange(e) {
          _this3.onSelectRowChange(e, record);
        },
        checked: this.state.selectedRowKeys.indexOf(rowKey) >= 0
      }))
    );
  };

  Table.prototype.onSelectRowChange = function onSelectRowChange(record, e) {
    this.onSelectionChange('', e.target.checked, record);
  };

  // 点击行选择或是表头的选择，都会触发


  Table.prototype.onSelectionChange = function onSelectionChange(type, checked, record) {
    var _props3 = this.props,
        rowSelection = _props3.rowSelection,
        prefixCls = _props3.prefixCls;
    var _state2 = this.state,
        selectedRowKeys = _state2.selectedRowKeys,
        dataSource = _state2.dataSource;

    var newSelectedRowKeys = [];
    var newSelectedRows = [];

    if (type === 'all') {
      // 表头选择,表头只有多选没有单选
      var allEnabledIndex = this.enabledRowKeyArr.map(function (k) {
        return k.index;
      });
      var allDisabledRowKey = this.disabledRowKeyArr.map(function (k) {
        return k.rowKey;
      });
      var changedRows = [];
      var changedRowIndex = [];
      if (checked) {
        // 选中全部
        // 可选的全部选中
        newSelectedRowKeys = this.enabledRowKeyArr.map(function (k) {
          return k.rowKey;
        });
        // 不可选的保持不变
        selectedRowKeys.forEach(function (k) {
          if (allDisabledRowKey.indexOf(k) >= 0) {
            newSelectedRowKeys.push(k);
          }
        });
        changedRowIndex = this.enabledRowKeyArr.filter(function (k) {
          return selectedRowKeys.indexOf(k.rowKey) < 0;
        }).map(function (k) {
          return k.index;
        });
      } else {
        // 全部不选中
        // 可选的全部不选中
        // newSelectedRowKeys = []
        // newSelectedRows = []

        // 不可选的保持不变
        newSelectedRowKeys = selectedRowKeys.filter(function (k) {
          return allDisabledRowKey.indexOf(k) >= 0;
        });
        changedRowIndex = allEnabledIndex;
      }
      newSelectedRows = dataSource.filter(function (d) {
        return newSelectedRowKeys.indexOf(d[prefixCls + '-rowKey']) >= 0;
      });
      changedRows = dataSource.filter(function (d, i) {
        return changedRowIndex.indexOf(i) >= 0;
      });

      rowSelection.onSelectAll instanceof Function && rowSelection.onSelectAll(checked, newSelectedRows, changedRows);
    } else {
      // 行选择
      var rowKey = record[prefixCls + '-rowKey'];

      // 每次产生新地址数组引用否则会修改state
      if (rowSelection.type === 'radio') {
        // 单选
        newSelectedRowKeys[0] = rowKey;
      } else if (checked) {
        // 多选&选中该项
        newSelectedRowKeys = selectedRowKeys.concat();
        newSelectedRowKeys.push(rowKey);
      } else {
        // 多选&不选中该项
        var index = -1;
        selectedRowKeys.forEach(function (k, i) {
          if (k === rowKey) index = i;
        });
        newSelectedRowKeys = selectedRowKeys.concat();
        newSelectedRowKeys.splice(index, 1);
      }

      var selectedRowIndex = this.enabledRowKeyArr.filter(function (k) {
        return newSelectedRowKeys.indexOf(k.rowKey) >= 0;
      }).map(function (k) {
        return k.index;
      });
      newSelectedRows = dataSource.filter(function (d, i) {
        return selectedRowIndex.indexOf(i) >= 0;
      });

      rowSelection.onSelect instanceof Function && rowSelection.onSelect(checked, record, newSelectedRows);
    }

    rowSelection.onChange instanceof Function && rowSelection.onChange(newSelectedRowKeys, newSelectedRows);
  };

  /** ********************表头排序********************* */


  Table.prototype.renderSorter = function renderSorter(col) {
    var _this4 = this;

    if (!col.sorter) return null;

    var prefixCls = this.props.prefixCls;
    var sorter = this.state.sorter;
    var columnKey = sorter.columnKey,
        order = sorter.order;

    var isUpActive = (col.key === columnKey || col.dataIndex === columnKey) && order === 'ascend';
    var isDownActive = (col.key === columnKey || col.dataIndex === columnKey) && order === 'descend';

    return _react2.default.createElement(
      'div',
      { className: prefixCls + '-column-sorter' },
      _react2.default.createElement('span', {
        title: '\u2191',
        className: (0, _classnames2.default)(prefixCls + '-column-sorter-ascend', {
          on: isUpActive
        }),
        onClick: function onClick() {
          _this4.onSorterClick('ascend', col);
        }
      }),
      _react2.default.createElement('span', {
        title: '\u2193',
        className: (0, _classnames2.default)(prefixCls + '-column-sorter-descend', {
          on: isDownActive
        }),
        onClick: function onClick() {
          _this4.onSorterClick('descend', col);
        }
      })
    );
  };

  Table.prototype.onSorterClick = function onSorterClick(opt, column) {
    var onChange = this.props.onChange;
    var sorter = this.state.sorter;
    var columnKey = sorter.columnKey,
        order = sorter.order;

    var _sorter = void 0;
    var ds = void 0;

    // 当前有sorter且点了该sorter,则清楚排序，剩下的情况都产生排序
    if ((column.key === columnKey || column.dataIndex === columnKey) && order === opt) {
      _sorter = {};
      // 每次恢复时从 dataSourceOrg 获取新的备份，因为下面每次排序都是直接在 dataSource 上排的，
      ds = this.state.dataSourceOrg.concat();
    } else {
      _sorter = {
        order: opt,
        column: column,
        field: column.title,
        columnKey: column.key || column.dataIndex
      };
      if (column.sorter instanceof Function) {
        // 本地排序
        /**
         * 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
         * 若 a 等于 b，则返回 0。
         * 若 a 大于 b，则返回一个大于 0 的值
         */
        ds = this.state.dataSource;
        // 暂时先假定coloumn.sorter是按升序排列的吧
        ds.sort(column.sorter);
        if (opt === 'descend') ds.reverse();
      } else if (column.sorter === true) {
        // 后台排序
        ds = this.state.dataSource;
      }
    }

    this.setState({
      dataSource: ds,
      sorter: _sorter
    });

    onChange instanceof Function && onChange({
      page: this.state.page,
      pageSize: this.state.pageSize
    }, _sorter);
  };

  Table.prototype.renderTHead = function renderTHead() {
    var _this5 = this;

    var showHeader = this.props.showHeader;

    if (!showHeader) return null;

    var _props4 = this.props,
        prefixCls = _props4.prefixCls,
        rowSelection = _props4.rowSelection;
    var sorter = this.state.sorter;
    var columnKey = sorter.columnKey;


    return _react2.default.createElement(
      'thead',
      null,
      this.dimen2ColumnHeaderArr.map(function (arr, i) {
        return _react2.default.createElement(
          'tr',
          { key: i },
          rowSelection && i === 0 ? _this5.renderSelection('th') : null,
          arr.map(function (c, j) {
            var _classNames;

            return (
              // 表头有分组时，包含分组的表头可能没有 dataIndex 和 key, 所以加了个 i-j 的 key 值供 react 使用
              _react2.default.createElement(
                'th',
                {
                  key: c.key || c.dataIndex || i + '-' + j,
                  colSpan: c[prefixCls + '-col-span'],
                  rowSpan: c[prefixCls + '-row-span'],
                  className: (0, _classnames2.default)(c.className, (_classNames = {}, _classNames[prefixCls + '-column-sort'] = columnKey !== undefined && (c.key === columnKey || c.dataIndex === columnKey), _classNames))
                },
                _react2.default.createElement(
                  'span',
                  null,
                  c.title,
                  _this5.renderSorter(c)
                )
              )
            );
          })
        );
      })
    );
  };

  Table.prototype.renderTBody = function renderTBody() {
    var _this6 = this;

    var dataSource = this.state.dataSource;
    var _props5 = this.props,
        pagination = _props5.pagination,
        rowClassName = _props5.rowClassName,
        rowSelection = _props5.rowSelection,
        prefixCls = _props5.prefixCls;

    if (!dataSource.length) {
      // 无数据的情况
      var span = this.formatColumns.length;
      rowSelection && span++;
      return _react2.default.createElement(
        'tbody',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            { colSpan: span },
            this.props.emptyText
          )
        )
      );
    }

    var _state3 = this.state,
        page = _state3.page,
        pageSize = _state3.pageSize;

    var curShowMax = page * pageSize;
    var data = void 0;

    if (pagination === true) {
      data = dataSource.slice(curShowMax - pageSize, curShowMax);
    } else {
      data = dataSource;
    }

    return _react2.default.createElement(
      'tbody',
      null,
      data.map(function (d, i) {
        return _react2.default.createElement(
          'tr',
          { key: d[prefixCls + '-rowKey'], className: rowClassName },
          rowSelection ? _this6.renderSelection('td', d) : null,
          _this6.formatColumns.map(function (c) {
            var text = d[c.dataIndex];
            if (c.render) {
              text = c.render(text, d, i);
            }
            return _react2.default.createElement(
              'td',
              { key: c.key || c.dataIndex, className: c.className },
              text
            );
          })
        );
      })
    );
  };

  Table.prototype.renderTFoot = function renderTFoot() {
    var _props6 = this.props,
        tfootData = _props6.tfootData,
        rowSelection = _props6.rowSelection;


    return tfootData instanceof Object ? _react2.default.createElement(
      'tfoot',
      null,
      _react2.default.createElement(
        'tr',
        null,
        rowSelection ? _react2.default.createElement('td', null) : null,
        this.formatColumns.map(function (c) {
          return _react2.default.createElement(
            'td',
            { key: c.key || c.dataIndex, className: c.className },
            tfootData[c.dataIndex]
          );
        })
      )
    ) : null;
  };

  Table.prototype.renderPagination = function renderPagination() {
    var _props7 = this.props,
        pagination = _props7.pagination,
        prefixCls = _props7.prefixCls;
    var _state4 = this.state,
        page = _state4.page,
        pageSize = _state4.pageSize,
        dataSource = _state4.dataSource;

    var paginationProps = {
      page: page,
      pageSize: pageSize,
      total: dataSource.length
    };

    if (pagination instanceof Object) {
      paginationProps = _extends({}, paginationProps, pagination);
    }

    return _react2.default.createElement(_Pagination2.default, _extends({}, paginationProps, {
      onChange: this.onPaginationChange,
      onPageSizeChange: this.onPaginationPageSizeChange,
      className: prefixCls + '-pagination'
    }));
  };

  Table.prototype.render = function render() {
    var _classNames2;

    var _props8 = this.props,
        prefixCls = _props8.prefixCls,
        className = _props8.className,
        style = _props8.style,
        showHeader = _props8.showHeader,
        loading = _props8.loading,
        pagination = _props8.pagination,
        title = _props8.title,
        footer = _props8.footer;

    var containerClasses = (0, _classnames2.default)(prefixCls + '-container', className);
    var dataSource = this.state.dataSource;


    return _react2.default.createElement(
      'div',
      { className: containerClasses, style: style },
      _react2.default.createElement(
        _Loading2.default,
        { loading: loading },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('' + prefixCls, (_classNames2 = {}, _classNames2[prefixCls + '-with-title'] = title instanceof Function, _classNames2[prefixCls + '-without-title'] = !(title instanceof Function), _classNames2[prefixCls + '-without-column-header'] = !showHeader, _classNames2[prefixCls + '-empty'] = !dataSource.length, _classNames2))
          },
          title instanceof Function ? _react2.default.createElement(
            'div',
            { className: prefixCls + '-title' },
            title()
          ) : null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'table',
              null,
              _react2.default.createElement(
                'colgroup',
                null,
                this.colgroupArr
              ),
              this.renderTHead(),
              this.renderTBody(),
              this.renderTFoot()
            )
          ),
          footer instanceof Function ? _react2.default.createElement(
            'div',
            { className: prefixCls + '-footer' },
            footer()
          ) : null
        ),
        pagination === false ? null : this.renderPagination()
      )
    );
  };

  return Table;
}(_react.Component);

Table.defaultProps = {
  // 前缀
  prefixCls: 'ns-table',
  // 表格列的配置描述
  columns: [],
  // 表格主体内容
  dataSource: [],
  // 是否显示表头
  showHeader: true,
  // 页面是否加载中
  loading: false,
  // 分页器
  pagination: false,
  // 列表项是否可选择
  rowSelection: null,
  // 无数据时的提示文案
  emptyText: 'Ops…暂无数据'
};
Table.propTypes = {
  // 前缀
  prefixCls: _propTypes2.default.oneOf(['ns-table']),
  // 表格列的配置描述
  columns: _propTypes2.default.arrayOf(_propTypes2.default.object),
  // 表格主体内容
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.object),
  // 是否显示表头
  showHeader: _propTypes2.default.bool,
  // 表尾数据，可用于放一些合计类数据
  tfootData: _propTypes2.default.object,
  // 头部标题
  title: _propTypes2.default.func,
  // 尾部标题
  footer: _propTypes2.default.func,
  // 页面是否加载中
  loading: _propTypes2.default.bool,
  // 分页器
  pagination: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]),
  // 表格行 key 的取值, 默认为0开始的行号, 当是函数时，参数为 record, index
  rowKey: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  // 分页、排序、筛选变化时触发
  onChange: _propTypes2.default.func,
  // 表格行的类名
  rowClassName: _propTypes2.default.string,
  // 列表项是否可选择
  rowSelection: _propTypes2.default.object,
  // 无数据时的提示文案
  emptyText: _propTypes2.default.string
};
exports.default = Table;