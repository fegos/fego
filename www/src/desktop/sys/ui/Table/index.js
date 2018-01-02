import style from './index.less' 
import React, { Component } from 'react'
import { Button, Table } from 'fego'

const columns = [{
	title: '序号',
	key: 'index',
	dataIndex: 'index',
	className: 'test-class',
	sorter: (a, b) => a.index - b.index
}, {
	title: '姓名',
	key: 'name',
	dataIndex: 'name',
}, {
	title: '年龄',
	key: 'age',
	dataIndex: 'age',
	sorter: (a, b) => a.age - b.age
}, {
	title: '性别',
	key: 'sex',
	dataIndex: 'sex',
}, {
	title: '公司',
	key: 'company',
	dataIndex: 'company',
}]

const columns2 = [{
	title: '序号',
	key: 'index',
	dataIndex: 'index',
	className: 'test-class',
	sorter: (a, b) => a.index < b.index
}, {
	title: 'Name',
	dataIndex: 'name',
	key: 'name',
	render: (text, record, index) => <a onClick={()=>{console.log('点了')}}>{text}</a>
  }, {
	title: 'Other',
	children: [{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
		sorter: (a, b) => a.age - b.age
	}, {
		title: 'Address',
		dataIndex: 'street',
		key: 'street',
		children: [{
		title: 'Street',
		dataIndex: 'street',
		key: 'street',
	  }, {
		title: 'Block',
		children: [{
		  title: 'Building',
		  dataIndex: 'building',
		  key: 'building',
		}, {
		  title: 'Door No.',
		  dataIndex: 'number',
		  key: 'number',
		}],
	  }],
	}],
  }, {
	title: 'Company',
	children: [{
	  title: 'Company Address',
	  dataIndex: 'companyAddress',
	  key: 'companyAddress',
	}, {
	  title: 'Company Name',
	  dataIndex: 'companyName',
	  key: 'companyName',
	}],
}, {
	title: 'Gender',
	dataIndex: 'gender',
	key: 'gender',
}];

const dataSource = [{
	index: 0,
	name: 'lucky',
	age: 18,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 1,
	name: 'lucky',
	age: 19,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 2,
	name: 'lucky',
	age: 18,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 3,
	name: 'lucky',
	age: 18,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 4,
	name: 'lucky',
	age: 10,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 5,
	name: 'lucky',
	age: 23,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 6,
	name: 'lucky',
	age: 18,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 7,
	name: 'lucky',
	age: 18,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 8,
	name: 'lucky',
	age: 18,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 9,
	name: 'lucky',
	age: 18,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 10,
	name: 'lucky',
	age: 18,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 11,
	name: 'lucky',
	age: 15,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}, {
	index: 12,
	name: 'lucky',
	age: 32,
	sex: '女',
	company: 'ease',
	street: '软件园',
	building: '网易大厦',
	number: '32-3',
	companyAddress: '软件园二期',
	companyName: 'netease',
	gender: '女'
}]

export default class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			page: 1,
			tableExampleDataSource: dataSource.slice(0, 10),
			loading: false,
			selectedRowKeys: [1],
		}
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className={style.page}>
				<Button onClick={()=>{this.setState({loading: !this.state.loading})}}>点我切换loading状态</Button>
				<Table columns={columns2} dataSource={this.state.tableExampleDataSource} loading={this.state.loading} tfootData={{
					name: '合计',
					age: '200',
					sex: 'lala',
					company: 'aaa'
				}} 
				pagination={{
					total: 13,
					page: this.state.page,
					showTotal: (total, range) => `共${total}条数据，显示${range[0]}-${range[1]}条`
				}} 
				// pagination={true}
				onChange={(pagination, sorter, filters) => {
					// // 模拟数据的变化
					pagination.page === 1 ? this.setState({
						tableExampleDataSource: dataSource.slice(0, 10)
					}) : this.setState({
						tableExampleDataSource: dataSource.slice(10, 13)
					})
					this.setState({
						page: pagination.page
					})
					console.log('onChange: ',pagination, sorter, filters)
				}} rowSelection={{
					// type: 'radio',
					selectedRowKeys: this.state.selectedRowKeys,
					getCheckboxProps: (record) => ({
						disabled: record.index === 0
					}),
					onChange: (selectedRowKeys, selectedRows) => {
						console.log('onChange', selectedRowKeys, selectedRows)
						this.setState({
							selectedRowKeys: selectedRowKeys
						})},
					onSelect: (selected, record, selectedRows) => {console.log('onSelect', selected, record, selectedRows)},
					onSelectAll: (selected, selectedRows, changedRows) => {console.log('onSelectAll', selected, selectedRows, changedRows)},
				}}/>
				<Table columns={columns} dataSource={[]} />
			</div>
		)
	}
}
