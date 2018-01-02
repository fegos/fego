import React from 'react'
import ReactDOM from 'react-dom'
import KeyCode from '../../common/KeyCode'
import LazyRenderBox from './LazyRenderBox'
import Animate from 'rc-animate'
import Icon from '../../Icon'
import tool from './tool'
let uuid = 0;
let openCount = 0;
export default class Dialog extends React.Component {
	static defaultProps = {
		afterClose: tool.noop,
		className: '',
		mask: true,
		visible: false,
		keyboard: true,
		closable: true,
		maskClosable: true,
		prefixCls: 'ns-dialog',
		onClose: tool.noop,
	};
	componentWillMount() {
		this.inTransition = false;
		this.titleId = `dialogTitle${uuid++}`;
	}
	componentDidMount() {
		this.componentDidUpdate({});
	}
	componentDidUpdate(prevProps) {
		const props = this.props;
		const mousePosition = this.props.mousePosition;
		if (props.visible) {
			// first show
			if (!prevProps.visible) {
				this.openTime = Date.now();
				this.lastOutSideFocusNode = document.activeElement;
				this.addScrollingEffect();
				this.refs.wrap.focus();
				const dialogNode = ReactDOM.findDOMNode(this.refs.dialog);
				if (mousePosition) {
					const elOffset = offset(dialogNode);
					tool.setTransformOrigin(dialogNode,
						`${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`);
				} else {
					tool.setTransformOrigin(dialogNode, '');
				}
			}
		} else if (prevProps.visible) {
			this.inTransition = true;
			if (props.mask && this.lastOutSideFocusNode) {
				try {
					this.lastOutSideFocusNode.focus();
				} catch (e) {
					this.lastOutSideFocusNode = null;
				}
				this.lastOutSideFocusNode = null;
			}
		}
	}
	componentWillUnmount() {
		if (this.props.visible || this.inTransition) {
			this.removeScrollingEffect();
		}
	}
	onAnimateLeave = () => {
		if (this.refs.wrap) {
			this.refs.wrap.style.display = 'none';
		}
		this.inTransition = false;
		this.removeScrollingEffect();
		this.props.afterClose();
	}
	onMaskClick = e => {
		if (Date.now() - this.openTime < 300) return;
		if (e.target === e.currentTarget) this.close(e);
	}
	onKeyDown = e => {
		const { keyboard, visible } = this.props;
		if (keyboard && e.keyCode === KeyCode.ESC) {
			this.close(e);
		}
		if (visible) {
			if (e.keyCode === KeyCode.TAB) {
				var activeElement = document.activeElement;
				var dialogRoot = this.refs.wrap;
				var sentinel = this.refs.sentinel;
				if (e.shiftKey) {
					if (activeElement === dialogRoot) {
						sentinel.focus();
					}
				} else if (activeElement === this.refs.sentinel) {
					dialogRoot.focus();
				}
			}
		}
	}
	getDialogElement = () => {
		const {
			closable, prefixCls, width, height, footer, visible,
			style, title, className, bodyStyle, bodyProps, children
		} = this.props;
		const dest = {};
		if (width !== undefined) {
			dest.width = width;
		}
		if (height !== undefined) {
			dest.height = height;
		}

		let _footer = footer;
		if (_footer) {
			_footer = (
				<div className={`${prefixCls}-footer`} ref="footer">
					{_footer}
				</div>
			);
		}

		let header;
		if (title) {
			header = (
				<div className={`${prefixCls}-header`} ref="header">
					<div className={`${prefixCls}-title`} id={this.titleId}>
						{title}
					</div>
				</div>
			);
		}

		let closer;
		if (closable) {
			closer = (
				<button
					onClick={this.close}
					aria-label="Close"
					className={`${prefixCls}-close`}
				>
					<Icon className={`${prefixCls}-close-x`} name='no' />
				</button>);
		}

		const _style = { ...style, ...dest };
		const transitionName = this.getTransitionName();
		const dialogElement = (
			<LazyRenderBox
				key="dialog-element"
				role="document"
				ref="dialog"
				style={_style}
				className={`${prefixCls} ${className || ''}`}
				visible={visible}
			>
				<div className={`${prefixCls}-content`}>
					{closer}
					{header}
					<div
						className={`${prefixCls}-body`}
						style={bodyStyle}
						ref="body"
						{...bodyProps}
					>
						{children}
					</div>
					{_footer}
				</div>
				<div tabIndex={0} ref="sentinel" style={{ width: 0, height: 0, overflow: 'hidden' }}>
					sentinel
				</div>
			</LazyRenderBox>
		);
		return (
			<Animate
				key="dialog"
				showProp="visible"
				onLeave={this.onAnimateLeave}
				transitionName={transitionName}
				component=""
				transitionAppear
			>
				{dialogElement}
			</Animate>
		);
	}
	getZIndexStyle = () => {
		const style = {};
		const { zIndex } = this.props;
		if (zIndex !== undefined) {
			style.zIndex = zIndex;
		}
		return style;
	}
	getWrapStyle = () => {
		return { ...this.getZIndexStyle(), ...this.props.wrapStyle }
	}
	getMaskStyle = () => {
		return { ...this.getZIndexStyle(), ...this.props.maskStyle }
	}
	getMaskElement = () => {
		const { mask, prefixCls, visible, maskProps } = this.props;
		let maskElement;
		if (mask) {
			const maskTransition = this.getMaskTransitionName();
			maskElement = (
				<LazyRenderBox
					style={this.getMaskStyle()}
					key="mask"
					className={`${prefixCls}-mask`}
					hiddenClassName={`${prefixCls}-mask-hidden`}
					visible={visible}
					{...maskProps}
				/>
			);
			if (maskTransition) {
				maskElement = (
					<Animate
						key="mask"
						showProp="visible"
						transitionAppear
						component=""
						transitionName={maskTransition}
					>
						{maskElement}
					</Animate>
				);
			}
		}
		return maskElement;
	}
	getMaskTransitionName = () => {
		const { maskTransitionName, maskAnimation, prefixCls } = this.props;
		let transitionName = maskTransitionName;
		const animation = maskAnimation;
		if (!transitionName && animation) {
			transitionName = `${prefixCls}-${animation}`;
		}
		return transitionName;
	}
	getTransitionName = () => {
		const { transitionName, animation, prefixCls } = this.props;
		let _transitionName = transitionName;
		if (!_transitionName && animation) {
			_transitionName = `${prefixCls}-${animation}`;
		}
		return _transitionName;
	}
	getElement = part => {
		return this.refs[part];
	}
	setScrollbar = () => {
		if (this.bodyIsOverflowing && this.scrollbarWidth !== undefined) {
			document.body.style.paddingRight = `${this.scrollbarWidth}px`;
		}
	}
	addScrollingEffect = () => {
		openCount++;
		if (openCount !== 1) {
			return;
		}
		this.checkScrollbar();
		this.setScrollbar();
		document.body.style.overflow = 'hidden';
		// this.adjustDialog();
	}
	removeScrollingEffect = () => {
		openCount--;
		if (openCount !== 0) {
			return;
		}
		document.body.style.overflow = '';
		this.resetScrollbar();
		// this.resetAdjustments();
	}
	close = (e) => {
		this.props.onClose(e);
	}
	checkScrollbar = () => {
		let fullWindowWidth = window.innerWidth;
		if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
			const documentElementRect = document.documentElement.getBoundingClientRect();
			fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
		}
		this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
		if (this.bodyIsOverflowing) {
			this.scrollbarWidth = tool.getScrollBarSize();
		}
	}
	resetScrollbar = () => {
		document.body.style.paddingRight = '';
	}
	adjustDialog = () => {
		if (this.refs.wrap && this.scrollbarWidth !== undefined) {
			const modalIsOverflowing =
				this.refs.wrap.scrollHeight > document.documentElement.clientHeight;
			this.refs.wrap.style.paddingLeft =
				`${!this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : ''}px`;
			this.refs.wrap.style.paddingRight =
				`${this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''}px`;
		}
	}
	resetAdjustments = () => {
		if (this.refs.wrap) {
			this.refs.wrap.style.paddingLeft = this.refs.wrap.style.paddingLeft = '';
		}
	}
	render() {
		const { title, prefixCls, maskClosable, visible, wrapClassName, wrapProps } = this.props;
		const style = this.getWrapStyle();
		// clear hide display
		// and only set display after async anim, not here for hide
		if (visible) {
			style.display = null;
		}
		return (
			<div>
				{this.getMaskElement()}
				<div
					tabIndex={-1}
					onKeyDown={this.onKeyDown}
					className={`${prefixCls}-wrap ${wrapClassName || ''}`}
					ref="wrap"
					onClick={maskClosable ? this.onMaskClick : undefined}
					role="dialog"
					aria-labelledby={title ? this.titleId : null}
					style={style}
					{...wrapProps}
				>
					{this.getDialogElement()}
				</div>
			</div>
		);
	}
}