import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import TextArea from './TextArea';
import KeyCode from '../common/KeyCode';
import { defaultProps, propTypes } from './PropsType';

export default class Input extends Component {
	constructor(props) {
		super(props);

		/**
		 * showClear 为 false, 则 showClearIcon 一定为初始默认值 false
		 * showClear 为 true, 则 showClearIcon 的值根据输入框内容决定，有内容，则为 true，否则为 false
		 */
		this.state = {
			showClearIcon: false,
			clearIconClicked: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== undefined && nextProps.value !== this.props.value) { // 受控
			// 更新清除图标是否显示的状态
			nextProps.showClear && this.setState({
				showClearIcon: !!nextProps.value,
			})
		}
	}

	componentDidMount() {
		let val = this.refs['input'].value,
			{ showClear } = this.props;
		// 更新清除图标是否显示的状态
		showClear && this.setState({
			showClearIcon: !!val
		})
	}

	onChange = (e) => {
		let val = this.refs['input'].value,
			{ onChange, value, showClear } = this.props;

		if (value === undefined) { // 非受控
			// 更新清除图标是否显示的状态
			showClear && this.setState({
				showClearIcon: !!val,
			})
		}
		onChange instanceof Function && onChange(val);
	}

	onKeyDown = (e) => {
		let { onPressEnter, onKeyDown } = this.props;
		if (e.nativeEvent.keyCode === KeyCode.ENTER && onPressEnter instanceof Function) {
			onPressEnter(e.nativeEvent);
		}
		if (onKeyDown instanceof Function) {
			onKeyDown(e.nativeEvent);
		}
	}

	onTouchStart = e => {
		if (this.state.clearIconClicked) return;
		if (this.props.disabled) return;
		this.setState({
			clearIconClicked: true
		})
	}

	onTouchEnd = e => {
		this.setState({
			clearIconClicked: false,
		})
		let { value, onChange, showClear } = this.props;
		if (value === undefined) {
			this.refs['input'].value = '' // 清空输入框
			// 更新清除图标是否显示的状态
			showClear && this.setState({
				showClearIcon: false,
			})
		}
		this.refs['input'].focus();
		onChange instanceof Function && onChange('');
	}

	render() {
		let { prefixCls, className, style, disabled, size, onPressEnter, suffix, prefix, showClear, ...other } = this.props;
		let otherProps = Object.assign({}, other);
		if ('value' in otherProps) {
			otherProps.defaultValue && delete otherProps.defaultValue;
		}
		let ipt = (
			<input ref='input' type='text' 
				{...otherProps}
				disabled={disabled}
				className={classNames(`${prefixCls}`, className, {
					[`${prefixCls}-sm`]: size === 'small',
					[`${prefixCls}-lg`]: size === 'large',
					[`${prefixCls}-disabled`]: disabled,
				})}
				style={style}
				onChange={this.onChange}
				onKeyDown={this.onKeyDown}
			/>
		)

		if (prefix || suffix || (showClear && !disabled)) { // 只有非 disabled 的输入框才渲染清除按钮
			return (
				<span className={classNames(`${prefixCls}-affix-wrapper`)}>
					{prefix ? (<span className={`${prefixCls}-prefix`}>{prefix}</span>) : null}
					{ipt}
					{/* 只有非 disabled 的输入框才渲染清除按钮 */}
					{(showClear && !disabled) ? (
						<span className={classNames(`${prefixCls}-clear`, {
							[`${prefixCls}-clear-hide`]: !this.state.showClearIcon,
							[`${prefixCls}-clear-click`]: !this.state.clearIconClicked,
						})} 
							onTouchStart={this.onTouchStart}
							onTouchEnd={this.onTouchEnd}
						>
							<Icon name='no' className={`${prefixCls}-icon`}/>
						</span>) : null}
					{suffix ? (<span className={`${prefixCls}-suffix`}>{suffix}</span>) : null}
				</span>
			)
		}

		return ipt;
	}
}

Input.TextArea = TextArea;
Input.defaultProps = defaultProps;
Input.propTypes = propTypes;