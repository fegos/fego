import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ListItem from './ListItem.mob'

export default class List extends Component {
	static defaultProps = {
		// 前缀
		prefixCls: 'ns-list',
	}
	static propTypes = {
		// 前缀
		prefixCls: PropTypes.oneOf(['ns-list']),
	}
	render() {
		let { prefixCls, className, style } = this.props;
		return (
			<div className={classNames(prefixCls, className)} style={style}>
				{this.props.children}
			</div>
		)
	}
}

List.Item = ListItem;