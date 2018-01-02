import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import './index.less';

export default class Frame extends Component {
	render() {
		return (
			<div className='app'>
				<Header />
				<div id='main'>
					{this.props.children}
				</div>
				<Footer />
			</div>
		)
	}
}