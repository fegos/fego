import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KeyCode from '../common/KeyCode';

export default class DropdownMenu extends Component {
	static defaultProps = {
		// 点击回调
		onChange: () => {}
	}

	static propTypes = {
		prefixCls: PropTypes.string.isRequired,
		// 当前下拉框的值
		selectedValue: PropTypes.string,
		// 下拉框的下拉选项 Options
		children: PropTypes.node,
		// 点击回调
		onChange: PropTypes.func,
		// 当前是否处于展开状态
		show: PropTypes.bool,
	}

	constructor(props) {
		super(props);

		this.state = {
			activeValue: this.getActiveValue(props)
		}
	}

	componentWillReceiveProps(nextProps) {
		if ('selectedValue' in nextProps && nextProps.selectedValue !== this.props.selectedValue) {
			this.setState({
				selectedValue: this.getActiveValue(nextProps)
			})
		}
	}

	getActiveValue(props) {
		this.menuItems = this.getMenuItems(props);

		let { selectedValue, children } = props, value = '';
		// 有选中的值，则 active 态的项为选中的项，否则为第一个非 disabled 的项
		return selectedValue ? selectedValue : (this.menuItems.filter(m=>!m.disabled)[0].value || '');
	}

	getMenuItems(props) {
		let { children } = props, arr = [];
		React.Children.forEach(children, (child, index) => {
			arr.push({
				value: child.props.value,
				label: child.props.children,
				disabled: child.props.disabled,
				index: index
			})
		}) 
		return arr;
	}

	onKeyDown = (e) => {
		let keyCode = e.nativeEvent.keyCode,
			{ activeValue } = this.state;
		/**
		 * 1. enter: 选中
		 * 2. up: 上移
		 * 3. down: 下移
		 * 上下移过程中需注意：
		 * 		1. menu 的头尾边界
		 * 		2. item 的 disabled 与否
		 */
		if (keyCode === KeyCode.ENTER) {
			let activeItem = this.menuItems.filter(m => m.value === activeValue)[0];
			this.props.onChange(activeItem.value, activeItem.label);
		} else if (keyCode === KeyCode.DOWN || keyCode === KeyCode.UP) {
			this.setState({
				activeValue: this.getNextActiveValue(keyCode)
			})
		}
	}

	getNextActiveValue(keyCode) {
		let { activeValue } = this.state,
			activeItem = this.menuItems.filter(m => m.value === activeValue)[0],
			index = activeItem.index,
			len = this.menuItems.length,
			flag = true,
			nextActiveValue = '';

		while(flag) {
			index = keyCode === KeyCode.DOWN ? (index + 1) : (index - 1);
			if (!this.menuItems[index%len].disabled) {
				flag = false;
				nextActiveValue = this.menuItems[index%len].value;
			}
		}

		return nextActiveValue;
	}

	onChange = (selectedValue, selectedLabel) => {
		this.setState({
			activeValue: selectedValue
		})
		this.props.onChange(selectedValue, selectedLabel);
	}

	render() {
		let { prefixCls, children, selectedValue, onChange, show } = this.props;

		return (
			<ul className={`${prefixCls}-menu`} onKeyDown={this.onKeyDown}>{
				React.Children.map(children, (child) => {
					return React.cloneElement(child, {
						active: show && (child.props.value === this.state.activeValue),
						selected: child.props.value === selectedValue,
						prefixCls: `${prefixCls}-menu-item`,
						onChange: this.onChange
					});
				})
			}</ul>
		)
	}
}