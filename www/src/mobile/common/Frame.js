import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Icon } from 'fego'
import './index.less';
const ListItem = List.Item;

const list = [
	{ title: '按钮 Button', url: '/Button'},
	{ title: '走马灯 Carousel', url: '/Carousel'},
	{ title: '复选框 Checkbox', url: '/Checkbox'},
	{ title: '对话框 Dialog', url: '/Dialog'},
	{ title: '图标 Icon', url: '/Icon'},
	{ title: '输入框 Input', url: '/Input'},
	{ title: '清单 List', url: '/List'},
	{ title: '分页 Pagination', url: '/Pagination'},
	{ title: '单选框 Radio', url: '/Radio'},
]

export default class Frame extends Component {
	render() {
		let path = window.location.pathname;
		if (path === '/') {
			return (
				<div className='home'>
					<h1 className='title'>Fego WAP 组件库</h1>
					{this.props.children}
				</div>
			)
		}
		return (
			<div className='instance'>
				<div className='title'>
					<Link to='/'><Icon name='home' /></Link>
					<span className='separator'>|</span> 
					{path.split('/')[1]}
				</div>
				{this.props.children}
			</div>
		)
	}
}