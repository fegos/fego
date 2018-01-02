
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './style/index.less'

export default class Frame extends Component {
	render() {
		return (
			<div className='app'>
				<Header />
				<div className='main'>
					<ul>
						<li><Link to='/ui/Dialog'>对话框 Dialog</Link></li>
						<li><Link to='/ui/Carousel'>走马灯 Carousel</Link></li>
						<li><Link to='/ui/Pagination'>分页器 Pagination</Link></li>
						<li><Link to='/ui/Table'>表格 Table</Link></li>
					</ul>
					<div className='page'>
					{this.props.children}
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}