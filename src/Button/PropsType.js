import PropTypes from 'prop-types'

export const defaultProps = {
	// 前缀
	prefixCls: 'ns-btn',
	// 按钮类型
	type: 'default',
	// 是否禁用
	disabled: false,
	// button 原生的 type 值，可选值请参考 HTML 标准
	htmlType: 'button',
	// 加载中状态
	loading: false,
	// 虚线边框
	dashed: false
}

export const propTypes = {
	// 前缀
	prefixCls: PropTypes.string,
	// 按钮类型
	type: PropTypes.oneOf(['default', 'primary', 'danger', 'ghost']),
	// 按钮形状
	shape: PropTypes.oneOf(['circle', 'circle-outline']),
	// 按钮尺寸
	size: PropTypes.string,
	// 是否禁用
	disabled: PropTypes.bool,
	// button 原生的 type 值，可选值请参考 HTML 标准
	htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
	// 点击回调
	onClick: PropTypes.func,
	// 加载中状态
	loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	// 类名
	className: PropTypes.string,
	// 图标
	icon: PropTypes.string,
	// 虚线边框
	dashed: PropTypes.bool
}