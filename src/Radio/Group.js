import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Radio from './index'

export default class RadioGroup extends Component {
	static defaultProps = {
		// 前缀
		prefixCls: 'ns-radio-group',
	}

	static propTypes = {
		// RadioGroup 下所有 input[type="radio"] 的 name 属性
		name: PropTypes.string.isRequired,
		// 受控属性，当前选中的值
		value: PropTypes.string,
		// 非受控属性，默认选中的值
		defaultValue: PropTypes.string,
		// 选项变化时的回调函数
		onChange: PropTypes.func,
		// 以配置形式设置子元素
		options: PropTypes.arrayOf(PropTypes.object),
		// 子元素
		children: PropTypes.node,
	}

	constructor(props) {
		super(props);

		this.state = {
			value: 'value' in props ? props.value : props.defaultValue
		}
	}

	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps && nextProps.value !== this.props.value) {
			this.setState({
				value: nextProps.value
			})
		}
	}

	onChange = (e) => {
		let value = e.target.value,
			{ onChange } = this.props;
		if (!('value' in this.props)) {
			this.setState({
				value: value
			})
		}
		// onChange instanceof Function && onChange(e)
		onChange instanceof Function && onChange(value)
	}

	render() {
		let { prefixCls, className, style, name, children, options } = this.props;
		return (
			<div className={classNames(`${prefixCls}`, className)} style={style}>{
				children ? (
					React.Children.map(children, (child) => {
						return React.cloneElement(child, {
							name: name,
							checked: child.props.value === this.state.value,
							onChange: this.onChange
						})
					})
				) : (
					options.map(opt => {
						return (<Radio 
							key={opt.value}
							value={opt.value}
							name={name}
							checked={opt.value === this.state.value}
							onChange={this.onChange}
							disabled={opt.disabled}>{opt.label}</Radio>)
					})
				)
			}</div>
		)
	}
}