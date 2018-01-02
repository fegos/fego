import style from './index.less' 
import React, { Component } from 'react'
import { Pagination, Button } from 'fego'

export default class Page extends Component {
	constructor(props) {
		super(props)

		this.state = {
			page: 9,
			page2: 1,
			loading: false,
			total: 13
		}
	}
	render() {
		return (
			<div className={style.page}>
				<Button onClick={()=>{this.setState({
					total: this.state.total+10
				})}}>点击改变总条数</Button>
				<Pagination total={this.state.total} /> 
				<Pagination showTotal={false} showJumper total={248} size='small' /> 
				<Pagination showTotal showJumper total={248} size='large' /> 
				<Pagination showTotal showJumper showPageSizeChanger total={248} defaultPage={4} />
				<Pagination showTotal showJumper pageSize={20}       total={248} defaultPage={1} /> 
				<Pagination showJumper showPageSizeChanger total={248}
					showTotal={(total, range, curPage, curPageSize)=>{
						return `总共${total}条数据，当前显示${range[0]}-${range[1]}条数据`
					}} 
					page={this.state.page}
					onChange={(curPage, curPageSize)=>{
						this.setState({
							page: curPage
						})
					}}/>
			</div>
		)
	}
}
