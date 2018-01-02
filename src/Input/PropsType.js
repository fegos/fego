import PropTypes from 'prop-types';

export const defaultProps = {
	// 前缀
	prefixCls: 'ns-input',
	// 大小
	size: 'default',
	// 是否显示清除按钮
	showClear: false,
	// 禁用
	disabled: false,
}

export const propTypes = {
	// 大小
	size: PropTypes.oneOf(['default', 'large', 'small']),
	// 是否显示清除按钮
	showClear: PropTypes.bool,
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
	// 前缀图标
	prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	// 后缀图标
	suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
