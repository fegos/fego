import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'fego'
export default class Footer extends Component {
	render() {
		let path = window.location.pathname;
		return (
			<div id='header'>
			{path === '/' ? (
				<h1 className='title'>Fego - Wap 组件库</h1>
			) : (
				<div className='title'>
					<Link to='/'><Icon name='home' /></Link>
					<span className='separator'>|</span> 
					{path.split('/')[1]}
				</div>
			)}
			</div>
		)
	}
}


