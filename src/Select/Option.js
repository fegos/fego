import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Option extends Component {
	static defaultProps = {
	}

	static propTypes = {
		// 前缀
		prefixCls: PropTypes.string,
		// 值
		value: PropTypes.string.isRequired,
		// 子元素
		children: PropTypes.node.isRequired,
		// 禁用
		disabled: PropTypes.bool,
		// 是否选中
		selected: PropTypes.bool,
		// 是否 active, 在键盘上下选中时激活
		active: PropTypes.bool,
		// 选择回调
		onChange: PropTypes.func
	}

	onClick = (e) => {
		let { disabled } = this.props;
		if (disabled) {
			e.stopPropagation();
			e.nativeEvent.stopImmediatePropagation(); // 点击 disabled 的项应阻止其冒泡到全局
			return;
		}

		let { onChange, value, children } = this.props;
		onChange instanceof Function && onChange(value, children);
	}

	render() {
		let { prefixCls, className, style, disabled, children, value, selected, active } = this.props;

		return (
			<li key={value} 
				aria-selected={selected}
				className={classNames(`${prefixCls}`, className, {
					[`${prefixCls}-active`]: active,
					[`${prefixCls}-selected`]: selected,
					[`${prefixCls}-disabled`]: disabled
				})} 
				onClick={this.onClick}
				style={style}>{children}</li>
		)
	}
}