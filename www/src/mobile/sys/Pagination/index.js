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
				})}}>点击改变总条数</Button>
				<Pagination total={this.state.total} />
				<Pagination total={248} size='small' /> 
				<Pagination total={248} size='large' /> 
				<Pagination total={248} defaultPage={4} />
				<Pagination defaultPageSize={20} total={248} defaultPage={8} /> 
				<Pagination total={248}
					page={this.state.page}
					onChange={(curPage, curPageSize)=>{
						console.log(curPage, curPageSize)
						this.setState({
							page: curPage
						})
					}}/>
			</div>
		)
	}
}