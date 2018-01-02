import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KeyCode from '../common/KeyCode';
import Select from '../Select';

const Option = Select.Option;

export default class Pagination extends Component {
	static defaultProps = {
		// 前缀
		prefixCls: 'ns-pagination',
		// 页码改变的回调，参数为改变后的页码以及每页条数
		onChange: (curPage, curPageSize) => {},
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
		onPageSizeChange: (curPage, newPageSize) => {},
	}
	static propTypes = {
		// 前缀
		prefixCls: PropTypes.oneOf(['ns-pagination']),
		// 页码改变的回调，参数为改变后的页码以及每页条数
		onChange: PropTypes.func,
		// 受控属性，当前页数，需搭配 onChange 使用
		page: PropTypes.number,
		// 非受控属性，当前页数
		defaultPage: PropTypes.number,
		// 数据总数
		total: PropTypes.number,
		// 组件尺寸
		size: PropTypes.oneOf(['small', 'default', 'large']),
		// 是否显示总数和当前数据顺序，参数为数据总数以及当前显示的数据范围
		showTotal: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		// 是否显示快速跳转至某页
		showJumper: PropTypes.bool,
		// 快速跳转至某页的文案
		jumperText: PropTypes.string,
		// 非受控属性，默认的每页条数
		defaultPageSize: PropTypes.number,
		// 受控属性，每页条数, 需搭配 onPageSizeChange 使用
		pageSize: PropTypes.number,
		// 是否显示可以改变 PageSize 的下拉框
		showPageSizeChanger: PropTypes.bool,
		// PageSize 的下拉框的选项值
		pageSizeOptions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number)]),
		// PageSize 的下拉框显示的格式
		pageSizeOptionFormat: PropTypes.string,
		// PageSize 变化的回调
		onPageSizeChange: PropTypes.func,
	}

	constructor(props) {
		super(props);

		let { page, defaultPage, pageSize, defaultPageSize, total } = props,
			curPage = page === undefined ? defaultPage : page,
			curPageSize = pageSize === undefined ? defaultPageSize : pageSize,
			totalPage = Math.ceil(total / curPageSize);
		
		(curPage <= 0) && (curPage = 1);
		(curPage > totalPage) && (curPage = totalPage);

		this.state = {
			totalPage,
			curPage,
			curPageSize
		}

		props.showPageSizeChanger && this.handlePageSizeOptions(props.pageSizeOptions);
	}

	componentWillReceiveProps(nextProps) {
		let { page, pageSize, total } = nextProps, _state = {};

		if (page !== undefined && page !== this.props.page) {
			_state.curPage = page;
		}

		if (pageSize !== undefined && pageSize !== this.props.pageSize) {
			let newPageSize = parseInt(pageSize),
				{ total, onChange, page } = this.props,
				curPage = _state.curPage || this.state.curPage,
				newTotalPage = Math.ceil(total / newPageSize),
				ifCurPageChange = curPage > newTotalPage,
				newCurPage = ifCurPageChange ? newTotalPage : curPage;
				
			_state.totalPage = newTotalPage;
			_state.curPageSize = newPageSize;

			if (page === undefined) { // 非受控属性才自动更新 curPage 的值
				_state.curPage = newCurPage;
			}

			ifCurPageChange && onChange(newCurPage, newPageSize);
		}

		if (total !== this.props.total) {
			let pageSize = _state.curPageSize || this.state.curPageSize;
			_state.totalPage = Math.ceil(total / pageSize);
		}
		
		this.setState(_state)
	}

	handlePageSizeOptions(options) {
		let { pageSizeOptionFormat } = this.props;
		this.pageSizeOptions = [];
		this.pageSizeOptions = options.map(opt => {
			return {
				value: typeof opt === 'number' ? opt.toString() : opt,
				label: pageSizeOptionFormat.replace(/^\${pageSize}/, opt)
			}
		})
	}

	getInputPage() {
		let value = this.refs['input'].value,
			page = parseInt(value),
			{ totalPage } = this.state;
		
		if (/^\s*$/.test(value) || /\D/g.test(value) || page < 1) {
			return 0;
		}
		return page > totalPage ? totalPage : page;
	}

	onJumperIptKeyUp = (e) => {
		if (e.nativeEvent.keyCode === KeyCode.ENTER) {
			let page = this.getInputPage();
			if (page) {
				this.onPageChange(page);
			}
			this.refs['input'].value = '';
		}
	}

	onPageSizeChange = (v) => {
		let newPageSize = parseInt(v),
			{ pageSize, onPageSizeChange } = this.props,
			{ curPage } = this.state;

		if (pageSize === undefined) { // 非受控 pageSize
			let { total, onChange, page } = this.props,
				newTotalPage = Math.ceil(total / newPageSize),
				ifCurPageChange = curPage > newTotalPage,
				newCurPage = ifCurPageChange ? newTotalPage : curPage;
			
			let _state = {
				totalPage: newTotalPage,
				curPageSize: newPageSize,
			};
			if (page === undefined) { // 非受控属性才自动更新 curPage 的值
				_state.curPage = newCurPage;
			}
			this.setState(_state);

			onPageSizeChange(newCurPage, newPageSize);
			ifCurPageChange && onChange(newCurPage, newPageSize);

		} else { // 受控 pageSize
			onPageSizeChange(curPage, newPageSize);
		}
	}

	onPageChange(curPage) {
		if (curPage === this.state.curPage) return; // 页码没变的话不触发onChange
		this.props.page === undefined && this.setState({
			curPage: curPage
		})
		this.props.onChange(curPage, this.state.curPageSize);
	}

	onPrev(step) {
		let { curPage } = this.state;

		if (curPage - step < 1) return;
		
		this.onPageChange(curPage - step);
	}

	onPrevOneClick = () => {
		this.onPrev(1)
	}

	onPrevFiveClick = () => {
		this.onPrev(5)
	}

	onNext(step) {
		let { curPage, totalPage } = this.state;

		if (curPage + step > totalPage) return;
		
		this.onPageChange(curPage + step);
	}

	onNextOneClick = () => {
		this.onNext(1)
	}

	onNextFiveClick = () => {
		this.onNext(5)
	}

	/**
	 * @memberof Pagination
	 * 用于渲染出数据总量和当前数据顺序
	 */
	renderTotal() {
		let { showTotal, prefixCls, total } = this.props,
			{ curPage, curPageSize } = this.state,
			curShowMax = curPage * curPageSize,
			range = [curShowMax - curPageSize + 1, curShowMax > total ? total : curShowMax];

		if (!showTotal) {
			return null;
		} else {
			let totalCnt = showTotal instanceof Function ? showTotal(total, range, curPage, curPageSize) : `总共${total}条数据`;
			return <li className={`${prefixCls}-total-text`}>{totalCnt}</li>;
		}
	}

	/**
	 * @memberof Pagination
	 * 用于渲染出 '指定每页可以显示多少条'、'是否可以快速跳转至某页' 区域
	 */
	renderOptions() {
		let { prefixCls, showJumper, jumperText, showPageSizeChanger, onPageSizeChange, size } = this.props;

		if (!showJumper && !showPageSizeChanger) {
			return null;
		} else {
			let jumperEl = null, optionEl = null, prefix = `${prefixCls}-options`;

			if (showJumper) {
				jumperEl = (
					<div className={`${prefix}-jumper`}>
						<span>{jumperText}</span>
						<input type='text' ref='input' onKeyUp={this.onJumperIptKeyUp} />
					</div>
				)
			}
			if (showPageSizeChanger) {
				let { curPageSize } = this.state,
					val = typeof curPageSize === 'number' ? curPageSize.toString() : curPageSize;

				optionEl = (
					<div className={`${prefix}-size-changer`}>
						<Select className={`${prefixCls}-select`}
								siez={size} 
								defaultValue={val}
								onChange={this.onPageSizeChange}>
						{
							this.pageSizeOptions.map(opt => <Option value={opt.value} key={opt.value}>{opt.label}</Option>)
						}
						</Select>
					</div>
				)
			}

			return (
				<div className={prefix}>
					{optionEl}
					{jumperEl}
				</div>
			)
		}
	}

	render() {
		let { prefixCls, className, style, size, total } = this.props,
			{ curPage, totalPage } = this.state,
			pageArr = [];

		if (total < 0) return null;

		// 处理页码项
		let start, end, front, tail, itemClass;
		if (totalPage <= 10) {
			start = 1;
			end = totalPage;
			front = false;
			tail = false;
		} else {
			if (curPage <= 4) {
				start = 1;
				end = curPage === 4 ? 6 : 5;
				front = false;
				tail = true;
			} else if (curPage >= totalPage - 3) {
				start = curPage === (totalPage - 3) ? totalPage-5 : totalPage-4;
				end = totalPage;
				front = true;
				tail = false;
			} else {
				start = curPage-2;
				end = curPage+2;
				front = true;
				tail = true;
			}
		}

		if (front) {
			pageArr.push(<li title='1' className={`${prefixCls}-item`} tabIndex='0' key={1} onClick={this.onPageChange.bind(this, 1)}><a>{1}</a></li>)
			pageArr.push(<li title='向前5页' className={`${prefixCls}-jump-prev`} tabIndex='0' key='prev5' onClick={this.onPrevFiveClick}><a></a></li>)
		}
		for (let i=start; i<=end; i++) {
			itemClass = classNames(`${prefixCls}-item`, i === curPage ? `${prefixCls}-item-active` : '');
			pageArr.push(<li title={`${i}`} className={itemClass} tabIndex='0' key={i} onClick={this.onPageChange.bind(this, i)}><a>{i}</a></li>)
		}
		if (tail) {
			pageArr.push(<li title='向后5页' className={`${prefixCls}-jump-next`} tabIndex='0' key='next5' onClick={this.onNextFiveClick}><a></a></li>)
			pageArr.push(<li title={`${totalPage}`} className={`${prefixCls}-item`} tabIndex='0' key={totalPage} onClick={this.onPageChange.bind(this, totalPage)}><a>{totalPage}</a></li>)
		}

		return(
			<ul unselectable="unselectable" className={classNames(prefixCls, className, {
				[`${prefixCls}-sm`]: size === 'small',
				[`${prefixCls}-lg`]: size === 'large'
			})} style={style}>
				{this.renderTotal()}
				<li title='上一页' className={classNames(`${prefixCls}-prev`, {
					[`${prefixCls}-prev-disabled`]: totalPage === 0 || curPage === 1
				})} onClick={this.onPrevOneClick}><a>&lt;</a></li>
				{pageArr}
				<li title='下一页' className={classNames(`${prefixCls}-next`, {
					[`${prefixCls}-next-disabled`]: totalPage === 0 || curPage === totalPage
				})} onClick={this.onNextOneClick}><a>&gt;</a></li>
				{this.renderOptions()}
			</ul>
		)
	}
}