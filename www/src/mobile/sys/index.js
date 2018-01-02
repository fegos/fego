import React, { Component } from 'react'
import { List } from 'fego'
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

export default class Home extends Component {
	render() {
		return (
			<div>
				<List>
				{
					list.map(item => {
						return (
							<ListItem link={item.url} key={item.url} title={item.title} />
						)
					})
				}
				</List>
			</div>
		)
	}
}