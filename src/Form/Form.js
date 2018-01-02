import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormItem from './FormItem';
import FormBtns from './FormBtns';

export default class Form extends Component{
	static create = function (Comp, options = {}) {
		 class WrappedComp extends Form {
			constructor(props) {
				super(props);
			}
			getFieldsValue = (fields = []) => {
				console.log('create function getFieldsValue, ')
			}
			render() {
				const form = {
					// decorator: decorator
					setFieldsValue: this.setFieldsValue,
					getFieldsValue: this.getFieldsValue,
					validateFields: this.validateFields,
					resetFields: this.resetFields,
					getFieldsError: this.getFieldsError
				}
				return <Comp {...this.props} form={form}/>
			}
		}

		return WrappedComp;
	}
	static defaultProps = {
		prefixCls: 'ns-form',
		// 表单整体布局方式
		layout: 'vertical',
		// 单个表单项的布局方式
		itemLayout: 'vertical',
		// 是否隐藏所有表单项的必选标记，默认 false
		hideRequiredMark: false,
		// 提交表单回调
		onSubmit: (params) => {},
		// 重置表单回调
		onReset: () => {},
	}
	static propTypes = {
		/**
		 * 表单整体布局方式
		 * vertical: 垂直排列
		 * horizontal/horizontal-inline: 水平排列
		 * 
		 * horizontal vs horizontal-inline:
		 * horizontal：表单项水平排列，按钮居右
		 * horizontal-inline：表单项水平排列，按钮尾随
		 */
		layout: PropTypes.oneOf(['vertical', 'horizontal', 'horizontal-inline']),
		/**
		 * 单个表单项的布局方式
		 * vertical: label 和 控件 呈垂直布局
		 * horizontal: label 和 控件 呈水平布局
		 */
		itemLayout: PropTypes.oneOf(['vertical', 'horizontal']),
		// 是否隐藏所有表单项的必选标记，默认 false
		hideRequiredMark: PropTypes.bool,
		// 提交表单回调
		onSubmit: PropTypes.func,
		// 重置表单回调
		onReset: PropTypes.func,
	}
	constructor(props) {
		super(props);

		let values = this.getInitialValues(props);
		this.state = {
			curValue: values
		}
		this.initialValue = values;
	}
	getInitialValues(props) {
		let { children } = props, values = {};
		React.Children.forEach(children, (child) => {
			let childProps = child.props;
			if (childProps.displayName === 'FormItem') {
				values[childProps.name] = childProps.initialValue;
			}
		})
		return values;
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state.curValue);
	}
	onReset = (e) => {
		e.preventDefault();
		this.setState({
			curValue: this.initialValue
		})
		this.props.onReset(e);
	}
	onFieldsChange = (name, value) => {
		const obj = {};
		obj[name] = value;
		const newValue = Object.assign({}, this.state.curValue, obj);
		this.setState({
			curValue: newValue
		})
	}
	render() {
		let { prefixCls, classNmae, style, children, layout, itemLayout, hideRequiredMark } = this.props;

		return (
			<form className={classNames(`${prefixCls}`, classNmae, {
				[`${prefixCls}-vertical`]: layout === 'vertical',
				[`${prefixCls}-horizontal f-cb`]: layout === 'horizontal',
				[`${prefixCls}-horizontal`]: layout === 'horizontal-inline',
				[`${prefixCls}-hide-required-mark`]: hideRequiredMark,
			})} style={style} 
				onSubmit={this.onSubmit}
				onReset={this.onReset} 
			>{
				React.Children.map(children, (child) => {
					let _props = child.props;
					if (_props.displayName === 'FormItem') {
						return React.cloneElement(child, {
							horizontal: itemLayout === 'horizontal',
							onFieldsChange: this.onFieldsChange,
							value: this.state.curValue[_props.name]
						})
					} else if (_props.displayName === 'FormBtns') {
						return React.cloneElement(child, {
							formLayout: layout,
							itemLayout: itemLayout
						})
					}
				})
			}</form>
		)
	}
}

Form.Item = FormItem;
Form.Btns = FormBtns;