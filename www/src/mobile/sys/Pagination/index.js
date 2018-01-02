import React, { Component } from 'react'
import { Pagination, Button } from 'fego'

export default class Page extends Component {
	state = { 
		total: 10,
		page: 1
	}
	render() {
		return (
			<div>
				<Button onClick={()=>{this.setState({
					total: this.state.total+10
				})}} style={{marginBottom: '5px'}}>点击改变总条数</Button>
				<Pagination total={this.state.total} />

				<p className='title'>使用非受控属性 defaultPage 的分页组件：</p>
				<Pagination total={248} defaultPage={4} />

				<p className='title'>通过 defaultPageSize 设置默认分页大小：</p>
				<Pagination defaultPageSize={20} total={248} defaultPage={8} /> 

				<p className='title'>使用受控属性 page 的分页组件，请搭配 onChange 维护 page 值：</p>
				<Pagination total={248}
					page={this.state.page}
					onChange={(curPage, curPageSize)=>{
						console.log(curPage, curPageSize)
						this.setState({
							page: curPage
						})
					}}/>

				<p className='title'>size='small' 的分页组件：</p>
				<Pagination total={248} size='small'/> 

				<p className='title'>size='large' 的分页组件：</p>
				<Pagination total={248} size='large' /> 
			</div>
		)
	}
}