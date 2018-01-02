import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import { defaultProps, propTypes } from './PropsType'
import insertSpace from './util'

export default class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
			loading: props.loading,
		}
	}
	handleClick = e => {
		if (this.state.clicked) return;
		this.setState({ clicked: true });
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => this.setState({ clicked: false }), 300);
		const onClick = this.props.onClick;
		if (onClick) {
			onClick(e);
		}
	}
	componentWillReceiveProps(nextProps) {
		const currentLoading = this.props.loading;
		const loading = nextProps.loading;
		if (currentLoading) {
			clearTimeout(this.delayTimeout);
		}
		if (typeof loading !== 'boolean' && loading && loading.delay) {
			this.delayTimeout = setTimeout(() => this.setState({ loading }), loading.delay);
		}
		else {
			this.setState({ loading });
		}
	}
	componentWillUnmount() {
		this.timeout && clearTimeout(this.timeout);
		this.delayTimeout && clearTimeout(this.delayTimeout);
	}
	render() {
		const { type, shape, size = '', className, htmlType, children, icon, prefixCls, disabled, dashed, style } = this.props;
		const { loading, clicked } = this.state;
		const classes = classNames(prefixCls, className, {
			[`${prefixCls}-${type}`]: type,
			[`${prefixCls}-${shape}`]: shape,
			[`${prefixCls}-lg`]: size === 'large',
			[`${prefixCls}-sm`]: size === 'small',
			[`${prefixCls}-dashed`]: dashed,
			[`${prefixCls}-icon-only`]: !children && icon && !loading,
			[`${prefixCls}-loading`]: loading,
			[`${prefixCls}-clicked`]: clicked,
		});
		const iconName = loading ? 'loading' : icon;
		const iconEl = iconName ? <Icon name={iconName} /> : null;
		const needInserted = React.Children.count(children) === 1 && (!iconName || iconName === 'loading');
		const kids = React.Children.map(children, child => insertSpace(child, needInserted));
		return (<button type={htmlType} className={classes} onClick={this.handleClick} disabled={disabled} style={style} >
			{iconEl}{kids}
		</button>);
	}
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;