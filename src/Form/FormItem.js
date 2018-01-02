import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FormItem extends Component{
	static defaultProps = {
		prefixCls: 'ns-form-item',
		displayName: 'FormItem',
		colon: true,
		onFieldsChange: () => {},
		horizontal: true,
	}
	static propTypes = {
		// 表单域唯一标识
		name: PropTypes.string,
		// 是否为必填项, 若不设置，会从 rules 中提取
		required: PropTypes.bool,
		// 表单域初始值
		initialValue: PropTypes.any,
		// label 和 控件 是否成水平布局,由 form 的 itemLayout 决定
		horizontal: PropTypes.bool,
		// 是否显示 label 后面的冒号
		colon: PropTypes.bool,
		// 标签的文本
		label: PropTypes.node,
		// 是否显示 label 后面的冒号
		hasFeedback: PropTypes.bool,
		/**
		 * 布局对象，接受属性如下
		 * {	
		 * 		width: 4 / '100px'
		 * 		labelCol: 4
		 * 		wrapperCol: 4
		 * }
		 */
		layout: PropTypes.object,
		// 表单项宽
		width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		// itemLayout 为 horizontal 时，label 占的比例，使用
		labelCol: PropTypes.number,
		// itemLayout 为 horizontal 时，控件 占的比例，
		wrapperCol: PropTypes.number,
		// 控件 占的比例，
		wrapperCol: PropTypes.number,
		// 校验规则
		rules: PropTypes.arrayOf(PropTypes.object)
	}
	constructor(props) {
		super(props);
		this.state = {
			/**
			 * 当无 initialValue 时对应的值为 undefined, 
			 * 由于 input 等组件认为当 value 为 undefined 时使用的是非受控属性 initialValue
			 * 因此需要指定默认值，eg: ''
			 * componentWillReceiveProps 同理
			 */
			value: props.value || '',
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({
				value: nextProps.value || ''
			})
		}
	}
	isRequired() {
		const { required } = this.props;
		if (required !== undefined) {
			return required;
		}
		const { rules } = this.props;
		if (rules) {
			return rules.filter(rule => rule.required).length > 0
		}

		return false;
	}
	onChange(val) {
		const { onFieldsChange, name} = this.props;
		onFieldsChange(name, val);
	}
	/**
	 * 渲染 label 标签
	 */
	renderLabel() {
		const { prefixCls, label, labelCol, colon, name } = this.props;
		const context = this.context;
		const required = this.isRequired();
	
		const labelColClassName = classNames(
			`${prefixCls}-label`,
			labelCol && labelCol.className,
		);
		const labelClassName = classNames({
			[`${prefixCls}-required`]: required,
		});
	
		let labelChildren = label;
		const haveColon = colon && !context.vertical;
		// 移除用户自己输入的冒号，冒号由 label 的 after 画
		if (haveColon && typeof label === 'string' && label.trim() !== '') {
			labelChildren = label.replace(/[：|:]\s*$/, '');
		}
	
		return label ? (
			<div {...labelCol} className={labelColClassName} key="label">
				<label
					htmlFor={name}
					className={labelClassName}
					title={typeof label === 'string' ? label : ''}
					onClick={this.onLabelClick}
					>
					{labelChildren}
				</label>
			</div>
		) : null;
	}
	/**
	 * 渲染控件
	 */
	renderWrapper(children) {
		const { prefixCls, wrapperCol } = this.props;
		return (
			<div key="wrapper" {...wrapperCol} className={classNames(
				`${prefixCls}-control-wrapper`,
				wrapperCol && wrapperCol.className,
			)} >
				{children}
			</div>
		);
	}
	renderValidateWrapper(c1, c2, c3) {
		let classes = '';
		const form = this.context.form;
		const props = this.props;
		const validateStatus = (props.validateStatus === undefined && form) ?
			this.getValidateStatus() :
			props.validateStatus;
	
		if (validateStatus) {
			classes = classNames({
				'has-feedback': props.hasFeedback,
				'has-success': validateStatus === 'success',
				'has-warning': validateStatus === 'warning',
				'has-error': validateStatus === 'error',
				'is-validating': validateStatus === 'validating',
			},);
		}
		return (
			<div className={`${props.prefixCls}-control ${classes}`}>
				{c1}{c2}{c3}
			</div>
		);
	}
	renderChildren() {
		let { children, name } = this.props;
		let { value } = this.state;
		let _children = React.Children.map(children, (child) => {
			// if (child && typeof child.type === 'function' && !child.props.size) {
			// 	return React.cloneElement(child, { size: 'large' });
			// }
			// 给控件指定id,达到点击 label 控件能获得焦点的效果
			return React.cloneElement(child, { 
				id: name,
				value: value,
				onChange: (val) => {
					// 允许控件自己监听 onChange 事件
					child.props.onChange instanceof Function && child.props.onChange(val);
					this.onChange(val);
				}
			});
		});
		return [
			this.renderLabel(),
			this.renderWrapper(
				this.renderValidateWrapper(
					_children,
					// this.renderHelp(),
					// this.renderExtra(),
				),
			),
		];
	}
	render() {
		let { prefixCls, className, style, layuot, horizontal, } = this.props;

		return (
			// wrapper 只负责样式上的宽度
			<div className={classNames(`${prefixCls}-wrapper`)}>
				<div className={classNames(`${prefixCls}`, className, {
					[`${prefixCls}-horizontal`]: horizontal,
					[`${prefixCls}-vertical`]: !horizontal,
				})} style={style}>{this.renderChildren()}</div>
			</div>
		);
	}
}