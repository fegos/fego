import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Pagination from '../Pagination';
import Checkbox from '../Checkbox';
import Radio from '../Radio';

export default class Table extends Component {
	static defaultProps = {
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
	}

	static propTypes = {
		// 表格列的配置描述
		columns: PropTypes.arrayOf(PropTypes.object),
		// 表格主体内容
		dataSource: PropTypes.arrayOf(PropTypes.object),
		// 是否显示表头
		showHeader: PropTypes.bool,
		// 表尾数据，可用于放一些合计类数据
		tfootData: PropTypes.object,
		// 头部标题
		title: PropTypes.func,
		// 尾部标题
		footer: PropTypes.func,
		// 页面是否加载中
		loading: PropTypes.bool,
		// 分页器
		pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
		// 表格行 key 的取值, 默认为0开始的行号, 当是函数时，参数为 record, index
		rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
		// 分页、排序、筛选变化时触发
		onChange: PropTypes.func,
		// 表格行的类名
		rowClassName: PropTypes.string,
		// 列表项是否可选择
		rowSelection: PropTypes.object,
		// 无数据时的提示文案
		emptyText: PropTypes.string,
	}

	constructor(props) {
		super(props);

		this.state = {}

		let dataSource = this.handleDataSource(props);
		
		// columns
		this.handleColumns(props);

		// 分页
		let pagination = this.handlePagination(props);

		// 行选择
		let { rowSelection } = props, selectedRowKeys;
		rowSelection && (selectedRowKeys = this.handleRowSelection(props));

		// colgroup
		this.colgroupArr = this.formatColumns.map( c => <col key={c.key || c.dataIndex}/> );

		this.state = {
			...pagination,
			dataSource,
			dataSourceOrg: dataSource.concat(),
			selectedRowKeys,
			sorter: {}
		}
	}

	componentWillReceiveProps(nextProps) {
		let { pagination, rowSelection } = nextProps, _state = {};

		if (pagination instanceof Object) {
			if ('page' in pagination && pagination.page !== this.state.page) {
				_state.page = pagination.page;
			}
			if ('pageSize' in pagination && pagination.pageSize !== this.state.pageSize) {
				_state.pageSize = pagination.pageSize;
			}
		}

		if (rowSelection instanceof Object) {
			let selectedRowKeys = this.handleRowSelection(nextProps);
			if ('selectedRowKeys' in rowSelection && rowSelection.selectedRowKeys.toString() !== this.state.selectedRowKeys.toString()) {
				_state.selectedRowKeys = selectedRowKeys;
			}
		}

		if (this.props.dataSource.toString() !== nextProps.dataSource.toString()) {
			let dataSource = this.handleDataSource(nextProps),
				{ sorter } = this.state,
				{ column, order } = sorter;
				
			_state.dataSourceOrg = dataSource.concat();
			if (column && column.sorter instanceof Function) { // 有需要前端排序的情况
				dataSource.sort(column.sorter);
				if (order === 'descend') dataSource.reverse();
			}
			_state.dataSource = dataSource;
		}

		this.setState(_state)
	}

	/**
	 * 处理数据 
	 * @memberof Table
	 */
	handleDataSource(props) {
		let { dataSource, rowKey, prefixCls, rowSelection } = props,
			newDataSource = dataSource.concat(), // 对原数据做了备份,因为修改了数据
			enabledData = [], disabledData = [];
		
		newDataSource.map( (d, i) => {
			let _rowKey;
			if (rowKey) {
				_rowKey = rowKey instanceof Function ? rowKey(d, i) : d[rowKey]
			} else {
				_rowKey = i
			}
			d[`${prefixCls}-rowKey`] = _rowKey;

			// 若是有行选择，则处理一下得到行选择回调时需要用到的rowKey，index
			let checkboxPropsObj = rowSelection && rowSelection.getCheckboxProps(d);
			if (checkboxPropsObj) {
				!checkboxPropsObj.disabled && enabledData.push({
					rowKey: _rowKey,
					index: i
				})
				checkboxPropsObj.disabled && disabledData.push({
					rowKey: _rowKey,
					index: i
				})
			}
		})

		rowSelection && (this.enabledRowKeyArr = enabledData, this.disabledRowKeyArr = disabledData);

		return newDataSource;
	}

	/**
	 * 处理表头，得到表头最大层级数和叶子节点
	 * @memberof Table
	 */
	handleColumns(props) {
		let { columns, prefixCls} = props,
			newColumns = columns.concat(), // 备份原数据,因为对数据做了修改
			arr = [], deep = 1;

		newColumns.forEach( c => deepTraverse(c, 1));
		// 遍历处理表头的深度，得到叶子节点
		function deepTraverse(col, level) {
			col.level = level;
			if (col.children) {
				let next = level + 1;
				col.children.forEach( cc => {
					let d = deepTraverse(cc, next);
					deep = d > deep ? d : deep; // 更新最大深度
				})
			} else {
				arr.push(col);
				return level;
			}
		}

		this.formatColumns = arr;
		this.deep = deep;

		this.handleColumnHeader(newColumns, deep, prefixCls);
	}

	/**
	 * 将 columns 转成二维数据，得到各个表头所占据的列&行数
	 * @memberof Table
	 */
	handleColumnHeader(columns, deep, prefixCls) {
		let dimen2Arr = Array(deep);

		columns.forEach( c => traverse(c, 1));
		function traverse(col, level) {
			let index = level - 1;
			if (!dimen2Arr[index]) dimen2Arr[index] = [];
			dimen2Arr[index].push(col);

			if (col.children) {
				let next = level + 1, cs = 0;
				col.children.forEach( cc => {
					let t = traverse(cc, next);
					cs = cs + t;
				})
				col[`${prefixCls}-row-span`] = 1;
				col[`${prefixCls}-col-span`] = cs;
				return cs;
			} else {
				col[`${prefixCls}-col-span`] = 1;
				col[`${prefixCls}-row-span`] = deep - level + 1;
				return 1;
			}
		}

		this.dimen2ColumnHeaderArr = dimen2Arr;
	}

	/**********************分页相关**********************/
	/**
	 * 预处理分页信息
	 * @memberof Table
	 */
	handlePagination(props) {
		let { pagination } = props, page = 1, pageSize = 10;

		if (pagination instanceof Object) {
			page = pagination.page || 1;
			pageSize = pagination.pageSize || 10;
		}
		return pagination ? {
			page,
			pageSize
		} : {}
	}

	/**
	 * 更新 Table 维护的 state 里的分页属性
	 * @param {number} page 
	 * @param {number} pageSize 
	 * @memberof Table
	 */
	updatePagination(page, pageSize) {
		let { pagination } = this.props, _state = {};
		
		// 有分页条，并且没使用分页条的受控属性，table 才自己更新属性值
		if (pagination === true || (pagination instanceof Object && !('page' in pagination))) { 
			_state.page = page
		}
		if (pagination === true || (pagination instanceof Object && !('pageSize' in pagination))) { 
			_state.pageSize = pageSize
		}
		if (pagination) {
			this.setState(_state)
		}
	}

	onPaginationChange = (page, pageSize) => {
		let { onChange } = this.props;
		this.updatePagination(page, pageSize)
		onChange instanceof Function && onChange({page, pageSize}, this.state.sorter);
	}

	onPaginationPageSizeChange = (page, pageSize) => {
		this.updatePagination(page, pageSize)
	}

	/**********************行选择相关**********************/
	/**
	 * 预处理行选择信息
	 * @param {object} props 
	 * @memberof Table
	 */
	handleRowSelection(props) {
		let { rowSelection } = props;

		// 处理 type
		if (!rowSelection.type) {
			rowSelection.type = 'checkbox'
		} else if (rowSelection.type !== 'checkbox' && rowSelection.type !== 'radio') {
			console.warn(`rowSelection.type expected to be 'checkbox' or 'radio', but got '${rowSelection.type}'`)
			rowSelection.type = 'checkbox'
		}

		// 处理 selectedRowKeys
		if (!rowSelection.selectedRowKeys) {
			rowSelection.selectedRowKeys = []
		} else if (rowSelection.type === 'radio') { // 有 selectedRowKeys 且为单选时，默认以第一个数据为准
			rowSelection.selectedRowKeys = rowSelection.selectedRowKeys.slice(0 ,1)
		}

		// 处理 getCheckboxProps
		if (!rowSelection.getCheckboxProps) rowSelection.getCheckboxProps = function(record) {
			return {
				disabled: false
			}
		}

		return rowSelection.selectedRowKeys;
	}

	/**
	 * @param {'th' or 'td'} type ：thead or tbody 的选择
	 * @param {obj} record ：每一行的记录
	 * @param {number or string} rowKey ：每一行的 key 值
	 * @memberof Table
	 */
	renderSelection(type, record) {
		if (type === 'th') {
			return this.renderThSelection();
		} else {
			return this.renderTdSelection(record);
		}
	}

	renderThSelection() {
		let { rowSelection, prefixCls } = this.props;
		// 找出可选择但是又没选择的行
		let len = this.enabledRowKeyArr.filter(k => this.state.selectedRowKeys.indexOf(k.rowKey) < 0).length;
		// 单选时表头不提供选择框
		return rowSelection.type === 'checkbox' ? (
			<th rowSpan={this.deep} className={classNames(`${prefixCls}-selection-column`)}>
				<Checkbox type={rowSelection.type}
					name={`${prefixCls}-selection-all`}
					indeterminate={0 < len && len < this.enabledRowKeyArr.length}
					onChange={this.onSelectAllChange}
					checked={len === 0}/>
			</th>
		) : <th rowSpan={this.deep} className={classNames(`${prefixCls}-selection-column`)} ></th>;
	}

	renderTdSelection(record) {
		let { rowSelection, prefixCls } = this.props,
			{ getCheckboxProps } = rowSelection,
			checkboxPropsObj = getCheckboxProps(record),
			rowKey = record[`${prefixCls}-rowKey`],
			Ele = rowSelection.type === 'checkbox' ? Checkbox : Radio;

		return (
			<td className={`${prefixCls}-selection-column`}>
				<Ele type={rowSelection.type} 
					className={`${prefixCls}-selection-${rowSelection.type}`}
					name={`${prefixCls}-selection`}
					{...checkboxPropsObj}
					onChange={this.onSelectRowChange.bind(this, record)} 
					checked={this.state.selectedRowKeys.indexOf(rowKey) >= 0} />
			</td>
		)
	}

	onSelectAllChange = (e) => {
		this.onSelectionChange('all', e.target.checked);
	}

	onSelectRowChange(record, e) {
		this.onSelectionChange('', e.target.checked, record);
	}

	// 点击行选择或是表头的选择，都会触发
	onSelectionChange(type, checked, record) {
		let { rowSelection, prefixCls } = this.props, 
			{ selectedRowKeys, dataSource } = this.state,
			newSelectedRowKeys = [], 
			newSelectedRows = [];

		if (type === 'all') { // 表头选择,表头只有多选没有单选
			let allEnabledIndex = this.enabledRowKeyArr.map(k => k.index),
				allDisabledRowKey = this.disabledRowKeyArr.map(k => k.rowKey),
				changedRows = [],
				changedRowIndex = [];
			if (checked) { // 选中全部
				// 可选的全部选中
				newSelectedRowKeys = this.enabledRowKeyArr.map(k => k.rowKey);
				// 不可选的保持不变
				selectedRowKeys.forEach(k => {
					if (allDisabledRowKey.indexOf(k) >= 0) {
						newSelectedRowKeys.push(k)
					}
				})
				changedRowIndex = this.enabledRowKeyArr.filter(k => selectedRowKeys.indexOf(k.rowKey) < 0).map(k => k.index);

			} else { // 全部不选中
				// 可选的全部不选中
				// newSelectedRowKeys = []
				// newSelectedRows = []

				// 不可选的保持不变
				newSelectedRowKeys = selectedRowKeys.filter(k => allDisabledRowKey.indexOf(k) >= 0);
				changedRowIndex = allEnabledIndex;
			}
			newSelectedRows = dataSource.filter(d => newSelectedRowKeys.indexOf(d[`${prefixCls}-rowKey`]) >= 0);
			changedRows = dataSource.filter((d,i) => changedRowIndex.indexOf(i) >= 0 );

			rowSelection.onSelectAll instanceof Function && rowSelection.onSelectAll(checked, newSelectedRows, changedRows);
		
		} else { // 行选择
			let rowKey = record[`${prefixCls}-rowKey`];

			// 每次产生新地址数组引用否则会修改state
			if (rowSelection.type === 'radio') { // 单选
				newSelectedRowKeys[0] = rowKey;
			} else if (checked) { // 多选&选中该项
				newSelectedRowKeys = selectedRowKeys.concat();
				newSelectedRowKeys.push(rowKey);
			} else { // 多选&不选中该项
				let index = -1;
				selectedRowKeys.forEach((k, i) => {
					if (k === rowKey) index = i;
				})
				newSelectedRowKeys = selectedRowKeys.concat();
				newSelectedRowKeys.splice(index, 1);
			}

			let selectedRowIndex = this.enabledRowKeyArr.filter(k => newSelectedRowKeys.indexOf(k.rowKey) >= 0).map(k => k.index)
			newSelectedRows = dataSource.filter((d,i) => selectedRowIndex.indexOf(i) >= 0 )

			rowSelection.onSelect instanceof Function && rowSelection.onSelect(checked, record, newSelectedRows);
		}

		rowSelection.onChange instanceof Function && rowSelection.onChange(newSelectedRowKeys, newSelectedRows);
	}

	/**********************表头排序**********************/
	renderSorter(col) {
		if (!col.sorter) return null;

		let { prefixCls } = this.props,
			{ sorter } = this.state,
			{ columnKey, order } = sorter,
			isUpActive = (col.key === columnKey || col.dataIndex === columnKey) && (order === 'ascend'),
			isDownActive = (col.key === columnKey || col.dataIndex === columnKey) && (order === 'descend');

		return (
			<div className={`${prefixCls}-column-sorter`}>
				<span title='↑' 
					className={classNames(`${prefixCls}-column-sorter-ascend`, {
						'on': isUpActive
					})}
					onClick={this.onSorterClick.bind(this, 'ascend', col)}></span>
				<span title='↓'
					className={classNames(`${prefixCls}-column-sorter-descend`, {
						'on': isDownActive
					})}
					onClick={this.onSorterClick.bind(this, 'descend', col)}></span>
			</div>
		)
	}

	onSorterClick(opt, column) {
		let { onChange } = this.props,
			{ sorter } = this.state,
			{ columnKey, order } = sorter,
			_sorter, ds;
		
		// 当前有sorter且点了该sorter,则清楚排序，剩下的情况都产生排序
		if ((column.key === columnKey || column.dataIndex === columnKey) && (order === opt)) {
			_sorter = {};
			// 每次恢复时从 dataSourceOrg 获取新的备份，因为下面每次排序都是直接在 dataSource 上排的，
			ds = this.state.dataSourceOrg.concat();  
		} else {
			_sorter = {
				order: opt,
				column,
				field: column.title,
				columnKey: column.key || column.dataIndex
			}
			if (column.sorter instanceof Function) { // 本地排序
				/**
				 * 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
				 * 若 a 等于 b，则返回 0。
				 * 若 a 大于 b，则返回一个大于 0 的值
				 */
				ds = this.state.dataSource;
				// 暂时先假定coloumn.sorter是按升序排列的吧
				ds.sort(column.sorter);
				if (opt === 'descend') ds.reverse();
			} else if (column.sorter === true) { // 后台排序
				ds = this.state.dataSource
			}
		}

		this.setState({
			dataSource: ds,
			sorter: _sorter
		})

		onChange instanceof Function && onChange({
			page: this.state.page,
			pageSize: this.state.pageSize
		}, _sorter)
	}

	renderTHead() {
		let { showHeader } = this.props;
		if (!showHeader) return null;

		let deep = this.deep,
			{ prefixCls, rowSelection } = this.props,
			{ sorter } = this.state,
			{ columnKey } = sorter;
		
		return (
			<thead>
			{
				this.dimen2ColumnHeaderArr.map((arr,i)=>{
					return (
						<tr key={i}>
						{/* 分组表头只放一个checkbox */}
						{(rowSelection && i === 0) ? this.renderSelection('th') : null}
						{
							arr.map((c, j) => {
								return (
									// 表头有分组时，包含分组的表头可能没有 dataIndex 和 key, 所以加了个 i-j 的 key 值供 react 使用
									<th key={c.key || c.dataIndex || `${i}-${j}`}
										colSpan={c[`${prefixCls}-col-span`]}
										rowSpan={c[`${prefixCls}-row-span`]}
										className={classNames(c.className, {
											[`${prefixCls}-column-sort`]: columnKey !== undefined && (c.key === columnKey || c.dataIndex === columnKey)
										})}
									>
										<span>{c.title}{this.renderSorter(c)}</span>
									</th>
								)
							})
						}
						</tr>
					)
				})
			}
			</thead>
		)
	}

	renderTBody() {
		let { dataSource } = this.state;
		if (!dataSource.length) { // 无数据的情况
			let span = this.formatColumns.length;
			rowSelection && (span++);
			return (
				<tbody>
					<tr><td colSpan={span}>{this.props.emptyText}</td></tr>
				</tbody>
			)
		}
		
		let { rowKey, pagination, rowClassName, rowSelection, prefixCls } = this.props, 
			{ page, pageSize } = this.state,
			curShowMax = page * pageSize,
			data;

		if (pagination === true) {
			data = dataSource.slice(curShowMax - pageSize, curShowMax);
		} else {
			data = dataSource;
		}

		return (
			<tbody>{
				data.map( (d, i) => {
					return (
						<tr key={d[`${prefixCls}-rowKey`]} className={rowClassName}>
						{rowSelection ? this.renderSelection('td', d) : null}
						{ this.formatColumns.map( (c, j) => {
							let text = d[c.dataIndex];
							if (c.render) {
								text = c.render(text, d, i);
							}
							return <td key={c.key || c.dataIndex} className={c.className}>{text}</td>;
						} ) }
						</tr>
					)
				})
			}</tbody>
		)
	}

	renderTFoot() {
		let { tfootData, rowSelection } = this.props;

		return tfootData instanceof Object ? (
			<tfoot>
				<tr>
					{rowSelection ? <td></td> : null}
					{this.formatColumns.map( (c, j) => <td key={c.key || c.dataIndex} className={c.className}>{tfootData[c.dataIndex]}</td>)}
				</tr>
			</tfoot>
		) : null
	}

	renderPagination() {
		let { pagination, prefixCls } = this.props,
			{ page, pageSize, dataSource } = this.state,
			paginationProps = {
				page,
				pageSize,
				total: dataSource.length
			};
		
		if (pagination instanceof Object) {
			paginationProps = {
				...paginationProps,
				...pagination
			}
		}

		return <Pagination 
				{...paginationProps} 
				onChange={this.onPaginationChange}
				onPageSizeChange={this.onPaginationPageSizeChange}
				className={`${prefixCls}-pagination`}/>
	}

	render() {
		let { prefixCls, className, style, showHeader, loading, pagination, title, footer } = this.props;
		let containerClasses = classNames(`${prefixCls}-container f-cb`, className);
		let { dataSource } = this.state;

		return (
			<div className={containerClasses} style={style}>
				{/* loading */}
				<div className={`${prefixCls}-loading`}>
					{loading ? (
						<div className='loading-icon'>
							<span className="bar bar-1"></span>
							<span className="bar bar-2"></span>
							<span className="bar bar-3"></span>
						</div>
					) : null}
					<div className={classNames({
						[`${prefixCls}-loading-container`]: true,
						'is-loading': loading
					})}>
						<div className={classNames(`${prefixCls}`, {
							[`${prefixCls}-with-title`]: (title instanceof Function),
							[`${prefixCls}-without-title`]: !(title instanceof Function),
							[`${prefixCls}-without-column-header`]: !showHeader,
							[`${prefixCls}-empty`]: !dataSource.length,
						})}>
							{/* 头部标题 */}
							{title instanceof Function ? <div className={`${prefixCls}-title`}>{title()}</div> : null}
							{/* 表格主体 */}
							<div>
								<table>
									<colgroup>{ this.colgroupArr }</colgroup>
									{/* 表头 */}
									{this.renderTHead()}
									{/* 主体 */}
									{this.renderTBody()}
									{/* 表尾 */}
									{this.renderTFoot()}
								</table>
							</div>
							{/* 尾部标题 */}
							{footer instanceof Function ? <div className={`${prefixCls}-footer`}>{footer()}</div> : null}
						</div>
						{/* 分页 */}
						{pagination === false ? null : this.renderPagination()}
					</div>
				</div>
			</div>
		)
	}
}