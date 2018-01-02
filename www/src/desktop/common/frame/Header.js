import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
	render() {
		return (
			<div id='header'>
				<div className='g-ctn'>
					<span className='m-logo'><Link to='/'>Fego WEB 组件库</Link></span>
				</div>
			</div>
		)
	}
}
