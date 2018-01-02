import React, { Component } from 'react'
import { Checkbox } from 'fego'

export default class Page extends Component {
	state = { 
		checked1: true,
		checked2: false,
		checkboxGroupValue1: ['eng'],
		checkboxGroupValue2: ['phy'],
	}
	render() {
		let opt = [
			<Checkbox value='chi' key='0'>语文</Checkbox>,
			<Checkbox value='mat' key='1'>数学</Checkbox>,
			<Checkbox value='eng' key='2'>英语</Checkbox>,
			<Checkbox value='phy' key='3'>物理</Checkbox>,
			<Checkbox value='che' key='4'>化学</Checkbox>,
			<Checkbox value='bio' key='5'>生物</Checkbox>
		];
		let opts2 = [
			{ label: '语文', value: 'chi' },
			{ label: '数学', value: 'mat' },
			{ label: '英语', value: 'eng', disabled: true },
			{ label: '物理', value: 'phy'},
			{ label: '化学', value: 'che'},
			{ label: '生物', value: 'bio'},
		];
		
		return (
			<div>
				<p className='title'>单独使用的 Checkbox：</p>
				<div>
					<Checkbox defaultChecked={true} onChange={(e)=>{console.log(e.target.checked)}}>使用 defaultChecked = true</Checkbox>
				</div>
				<div>
					<Checkbox defaultChecked={false} onChange={(e)=>{console.log(e.target.checked)}}>使用 defaultChecked = false</Checkbox>
				</div>
				<div>
					<Checkbox checked={this.state.checked1} onChange={(e)=>{
						console.log(e.target.checked);
						this.setState({checked1: e.target.checked})}}>使用 checked = true</Checkbox>
				</div>
				<div>
					<Checkbox checked={this.state.checked2} onChange={(e)=>{
						console.log(e.target.checked);
						sthis.setState({checked2: e.target.checked})}}>使用 checked = false</Checkbox>
				</div>
				<div>
					<Checkbox disabled checked={true} onChange={(e)=>{console.log(e.target.checked)}} >disabled checked checkbox</Checkbox>
				</div>
				<div>
					<Checkbox disabled checked={false} onChange={(e)=>{console.log(e.target.checked)}} >disabled unchecked checkbox</Checkbox>
				</div>

				<p className='title'>组合使用的 Checkbox, 不带 defaultValue: </p>
				<Checkbox.Group name='cbox1' onChange={(v)=>{console.log(v)}}>
					{opt}
				</Checkbox.Group>

				<p className='title'>组合使用的 Checkbox, 带 defaultValue: </p>
				<Checkbox.Group name='cbox2' defaultValue={['chi']} onChange={(v)=>{console.log(v)}}>
					{opt}
				</Checkbox.Group>

				<p className='title'>组合使用的 Checkbox, 使用 value: </p>
				<Checkbox.Group name='cbox3' value={this.state.checkboxGroupValue1} onChange={(v)=>{
					console.log(v)
					this.setState({
						checkboxGroupValue1: v
					})
				}}>
					{opt}
				</Checkbox.Group>

				<p className='title'>组合使用的 Checkbox, 以配置项形式设置子元素: </p>
				<Checkbox.Group name='cbox4' options={opts2} value={this.state.checkboxGroupValue2} onChange={(v)=>{
					console.log(v)
					this.setState({
						checkboxGroupValue2: v
					})
				}} />
			</div>
		)
	}
}