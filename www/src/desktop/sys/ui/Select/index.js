import style from './index.less'
import React, { Component } from 'react'
import { Select } from 'fego'

export default class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectValue: 'asy',
		}
	}
	render() {
		let opts = [<Select.Option value='asy' key='0'>asy</Select.Option>,
			<Select.Option value='lucky' key='1'>lucky</Select.Option>,
			<Select.Option value='disabled' disabled key='2'>disabled</Select.Option>]

		return (
			<div className={style.page}>
				<div className='section'>
					<span>使用非受控属性 defaultValue 的下拉框: </span>
					<Select showClear 
						defaultValue='lucky' 
						onChange={(v)=>{console.log('1 change')}}
						onFocus={()=>{console.log('1 focus')}}
						onBlur={()=>{console.log('1 blur')}}
					>{opts}</Select>
				</div>
				<div className='section'>
					<span>使用受控属性 value 的下拉框: </span>
					<Select value={this.state.selectValue} 
						onChange={(v)=>{console.log('2 change', v);this.setState({selectValue: v})}}
						onFocus={()=>{console.log('2 focus')}}
						onBlur={()=>{console.log('2 blur')}}
					>{opts}</Select>
				</div>
				<div className='section'>
					<span>无默认选中值的下拉框: </span>
					<Select placeholder='placeholder'>{opts}</Select>
				</div>
				<div className='section'>
					<span>下拉框尺寸: </span>
					<Select size='small'>{opts}</Select>
					<Select>{opts}</Select>
					<Select size='large'>{opts}</Select>
				</div>
				<div className='section'>
					<span>禁用的下拉框: </span>
					<Select disabled defaultValue='disabled'>{opts}</Select>
				</div>
			</div>
		)
	}
}
