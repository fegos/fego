import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KeyCode from '../common/KeyCode';
import Option from './Option';
import DropdownMenu from './DropdownMenu';
import Icon from '../Icon';

export default class Select extends Component {
	static defaultProps = {
		// 前缀
		prefixCls: 'ns-select',
		// 选择框大小
		size: 'default',
		// 是否显示清楚按钮
		showClear: false,
		// 是否禁用
		disabled: false,
	}

	static propTypes = {
		// 选择框大小
		size: PropTypes.oneOf(['default', 'large', 'small']),
		// 受控属性，当前选中的项，需配合 onChange 使用
		value: PropTypes.string,
		// 非受控属性，当前选中的项
		defaultValue: PropTypes.string,
		// 是否显示清楚按钮
		showClear: PropTypes.bool,
		// 是否禁用
		disabled: PropTypes.bool,
		// 选择框 value 变化回调
		onChange: PropTypes.func,
		// 获得焦点时回调
		onFocus: PropTypes.func,
		// 失去焦点的时回调
		onBlur: PropTypes.func,
		// 下拉菜单的 className 属性
		dropdownClassName: PropTypes.string,
	}

	constructor(props) {
		super(props);

		this.state = {
			value: 'value' in props ? props.value : props.defaultValue,
			focused: false,
			expand: false,
			menuHide: true,
			menuTrans: false,
		}
	}

	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps && nextProps.value !== this.props.value) {
			this.setState({
				value: nextProps.value
			})
		}
	}

	componentDidMount() {
		document.addEventListener('click', this.listenDocClick);
	}

	componentWillUnmount() {
		if (this.timer) clearTimeout(this.timer);
		document.removeEventListener('click', this.listenDocClick)
	}

	listenDocClick = (e) => {
		if (this.props.disabled ) return ;
		if (this.innerItemClick) {
			this.innerItemClick = false;
			return;
		}
		/**
		 * document.activeElement !== this.refs.select 为 true 表明页面发生了点击，并且点击的不是自己
		 */
		if (document.activeElement !== this.refs.select) {
			let { onBlur } = this.props,
				{ expand, focused } = this.state;

			if (expand) { // 当前展开，则应该收起下拉，并失焦
				this.hideDropDown({
					focused: false
				})
			} else if (focused) { // 当前收起，有焦点，直接失焦即可
				this.setState({
					focused: false
				})
				onBlur instanceof Function && onBlur();
			}
		}
	}

	onShowDropdown = (e) => {
		if (this.props.disabled ) return ;

		let { expand } = this.state;
		if (expand) {
			this.hideDropDown();
		} else {
			this.showDropDown();
		}
	}

	onChange = (selectedValue, selectedLabel) => {
		this.innerItemClick = true;

		let { value } = this.state, 
			{ onChange } = this.props,
			_state = {};

		if (value !== selectedValue) { // 更新 select 的值
			!('value' in this.props) && (_state.value = selectedValue);
			onChange instanceof Function && onChange(selectedValue, selectedLabel);
		}

		// 收起 select
		this.hideDropDown(_state);
	}

	showDropDown = () => {
		let { onFocus } = this.props,
			{ focused } = this.state;
		this.setState({
			expand: true,
			focused: true,
			menuHide: false
			// menuTrans: false,
		})
		!focused && onFocus instanceof Function && onFocus();
	}

	hideDropDown = (otherState = {}) => {
		if (this.timer) clearTimeout(this.timer);

		this.setState({
			...otherState,
			expand: false, // 告诉整个组件，下拉菜单要关闭了
			menuHide: false, // 显示关闭动画，300ms 再后隐藏
			menuTrans: true
		})

		if ('focused' in otherState && !otherState.focused) {
			let { onBlur } = this.props;
			onBlur instanceof Function && onBlur();
		}

		this.timer = setTimeout(() => {
			this.setState({
				menuHide: true,
				menuTrans: false
			})
		}, 300)
	}

	onClear = (e) => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation(); // 阻止点击事件冒泡

		this.innerItemClick = true;

		let { value, expand } = this.state, 
			{ onChange } = this.props,
			_state = {};
		
		!('value' in this.props) && (_state.value = '');
		onChange instanceof Function && onChange('', '');

		if (expand) {
			this.hideDropDown(_state);
		} else {
			this.setState(_state);
		}
	}

	getLabel() {
		let { value } = this.state;
		if (!value) return null;

		let label = '';
		React.Children.forEach(this.props.children, (child)=>{
			if (child.props.value === value) {
				label = child.props.children;
			}
		})
		return label;
	}

	onKeyDown = (e) => {
		let { disabled } = this.props;
		if (disabled) return;

		let keyCode = e.nativeEvent.keyCode,
			{ expand, value } = this.state;
		/**
		 * 1. 当前展开
		 * 		1.1 ESC: 收起
		 * 		1.2 其他: 交给 menu 自己处理
		 * 2. 当前收起
		 * 		2.1 down: 展开
		 * 		2.2 enter: 展开
		 */
		if (expand) { // 当前展开
			if (keyCode === KeyCode.ESC) {
				this.hideDropDown();
				e.nativeEvent.preventDefault();
				e.nativeEvent.stopPropagation();
				return;
			} else {
				let menu = this.refs.menu;
				menu && menu.onKeyDown(e); // 把键盘事件传递给 menu 自己处理
				e.nativeEvent.preventDefault();
				e.nativeEvent.stopPropagation();
				return;
			}
		} else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) { // 当前没展开，则可以通过键盘展开菜单
			this.showDropDown();
			e.nativeEvent.preventDefault();
		}
	}

	render() {
		let { prefixCls, className, style, size, disabled, multiple, showClear, placeholder, children, dropdownClassName } = this.props;
		let { value, expand, menuHide, menuTrans, focused } = this.state;
		let label = this.getLabel();

		return (
			<div className={classNames(`${prefixCls}`, className, {
				[`${prefixCls}-sm`]: size === 'small',
				[`${prefixCls}-lg`]: size === 'large',
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-open`]: expand,
				[`${prefixCls}-focused`]: focused,
				[`${prefixCls}-allow-clear`]: showClear,
			})} style={style}>
				<div ref='select' 
					className={classNames(`${prefixCls}-selection`, {
						[`${prefixCls}-selection-multiple`]: multiple,
						[`${prefixCls}-selection-value`]: value,
					})} 
					onClick={this.onShowDropdown}
					aria-haspopup={true}
					aria-expanded={expand}
					aria-autocomplete='list'
					tabIndex={0}
					onKeyDown={this.onKeyDown}
				>
					<div className={`${prefixCls}-selection-inner f-cb`}>
						{value ? (
							<span className={`${prefixCls}-selection-selected-value`} >{label}</span>
						) : (
							<span className={`${prefixCls}-selection-placeholder`}>{placeholder}</span>
						)}
					</div>
					{(showClear && value) ? (
						<span className={classNames(`${prefixCls}-clear`)} 
							unselectable="unselectable"
							onClick={this.onClear}
						><Icon name='no' className={`${prefixCls}-icon`}/></span>) : null}
					<span className={classNames(`${prefixCls}-arrow`, {
						[`${prefixCls}-arrow-up-down`]: !expand && !menuHide,
						[`${prefixCls}-arrow-down-up`]: expand
					})} unselectable="unselectable"><Icon name='back' className={`${prefixCls}-icon`} /></span>
				</div>
				<div className={classNames(`${prefixCls}-dropdown`, dropdownClassName, {
					[`${prefixCls}-dropdown-hide`]: menuHide,
					[`${prefixCls}-dropdown-fadeout`]: menuTrans
				})}>
					<DropdownMenu ref='menu'
						show={expand}
						onChange={this.onChange}
						selectedValue={value} 
						prefixCls={`${prefixCls}-dropdown`}>{children}</DropdownMenu>
				</div>
			</div>
		)
	}
}

Select.Option = Option;