import PropTypes from 'prop-types'
export const defaultProps = {
	// 前缀
	prefixCls: 'ns-dialog',
	// 宽度，PC 默认520 Wap 默认100%，单独设定
	// width: ,
	// 模态框出现动画，暂时不知支持的选项有哪些
	transitionName: 'zoom',
	// 模态框背景出现动画，暂时不知支持的选项有哪些
	maskTransitionName: 'fade',
	// 点击确认按钮时按钮是否出现loading状态
	confirmLoading: false,
	// 是否可见
	visible: false,
	// 确认按钮文案
	okText: '确定',
	// 取消按钮文案
	cancelText: '取消',
	// 是否显示右上角的关闭按钮, PC 默认true Wap 默认false，单独设定
	// closable: ,
	// 是否能通过点击背景关闭模态框
	maskClosable: true,
}
export const propTypes = {
	// 前缀
	prefixCls: PropTypes.string,
	// 确认按钮回调
	onOk: PropTypes.func,
	// 取消按钮回调
	onCancel: PropTypes.func,
	// 确认按钮文案
	okText: PropTypes.node,
	// 取消按钮文案
	cancelText: PropTypes.node,
	// 宽度
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	// 点击确认按钮时按钮是否出现loading状态
	confirmLoading: PropTypes.bool,
	// 是否可见
	visible: PropTypes.bool,
	// 底部内容
	footer: PropTypes.node,
	// 标题
	title: PropTypes.node,
	// 是否显示右上角的关闭按钮
	closable: PropTypes.bool,
	// 模态框出现动画
	transitionName: PropTypes.string,
	// 模态框背景出现动画
	maskTransitionName: PropTypes.string,
	// 是否能通过点击背景关闭模态框
	maskClosable: PropTypes.bool,
}