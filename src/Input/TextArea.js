import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import calculateNodeHeight from './util';
import KeyCode from '../common/KeyCode'

function onNextFrame(cb) {
	if (window.requestAnimationFrame) {
		return window.requestAnimationFrame(cb);
	}
	return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
	if (window.cancelAnimationFrame) {
		window.cancelAnimationFrame(nextFrameId);
	} else {
		window.clearTimeout(nextFrameId);
	}
}

export default class TextArea extends Component {
	static defaultProps = {
		// 前缀
		prefixCls: 'ns-input',
		// 禁用
		disabled: false,
		// 自适应内容高度
		autoSize: false,
		// 输入框大小能否改变
		resize: true
	}

	static propTypes = {
		// 默认值，非受控属性
		defaultValue: PropTypes.string,
		// 受控属性 value
		value: PropTypes.string,
		// 禁用
		disabled: PropTypes.bool,
		// 回车回调
		onPressEnter: PropTypes.func,
		// 按键按下回调
		onKeyDown: PropTypes.func,
		// 输入框值发生变化回调
		onChange: PropTypes.func,
		// 自适应内容高度
		autoSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
		// 输入框大小能否改变
		resize: PropTypes.bool
	}

	constructor(props) {
		super(props);

		this.state = {
			textareaStyles: null
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== undefined && nextProps.value !== this.props.value) {
			if (this.nextFrameActionId) {
				clearNextFrameAction(this.nextFrameActionId);
			}
			this.nextFrameActionId = onNextFrame(this.resizeTextarea);
		}
	}

	componentDidMount() {
		this.resizeTextarea();
	}

	resizeTextarea = () => {
		const { autoSize } = this.props;
		if (!autoSize || !this.refs['textarea']) {
			return;
		}
		const minRows = autoSize instanceof Object ? autoSize.minRows : null;
		const maxRows = autoSize instanceof Object ? autoSize.maxRows : null;

		const textareaStyles = calculateNodeHeight(this.refs['textarea'], false, minRows, maxRows);

		this.setState({ textareaStyles });
	}

	onChange = (e) => {
		let val = this.refs['textarea'].value,
			{ onChange, value } = this.props;

		if (value === undefined) {
			this.resizeTextarea();
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

	render() {
		let { prefixCls, className, style, disabled, onPressEnter, autoSize, resize, ...other } = this.props;
		let otherProps = Object.assign({}, other);
		if ('value' in otherProps) {
			otherProps.defaultValue && delete otherProps.defaultValue;
		}
		let styles = {
			...style,
			...this.state.textareaStyles
		};

		return (
			<textarea ref='textarea' type='textarea'
				{...otherProps}
				style={styles}
				disabled={disabled}
				className={classNames(`${prefixCls}`, className, {
					[`${prefixCls}-disabled`]: disabled,
					[`${prefixCls}-no-resize`]: !resize,
				})}
				onChange={this.onChange}
				onKeyDown={this.onKeyDown}
			/>
		);
	}
}