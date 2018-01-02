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
				<div style={{marginTop: '10px'}}>
					<h3>单独使用的 Checkbox</h3>
					<Checkbox defaultChecked={true} onChange={(e)=>{console.log(e.target.checked)}}>使用defaultChecked=true</Checkbox>
					<Checkbox defaultChecked={false} onChange={(e)=>{console.log(e.target.checked)}}>使用defaultChecked=false</Checkbox>
					<Checkbox checked={this.state.checked1} onChange={(e)=>{console.log(e.target.checked);this.setState({checked1: e.target.checked})}}>使用checked=true</Checkbox>
					<Checkbox checked={this.state.checked2} onChange={(e)=>{console.log(e.target.checked);this.setState({checked2: e.target.checked})}}>使用checked=false</Checkbox>
					<Checkbox disabled checked={true} onChange={(e)=>{console.log(e.target.checked)}} >disabled</Checkbox>
					<Checkbox disabled checked={false} onChange={(e)=>{console.log(e.target.checked)}} >disabled</Checkbox>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Checkbox, 不带 defaultValue: </h3>
					<Checkbox.Group name='cbox1' onChange={(v)=>{console.log(v)}}>
						{opt}
					</Checkbox.Group>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Checkbox, 带 defaultValue: </h3>
					<Checkbox.Group name='cbox2' defaultValue={['chi']} onChange={(v)=>{console.log(v)}}>
						{opt}
					</Checkbox.Group>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Checkbox, 使用 value: </h3>
					<Checkbox.Group name='cbox3' value={this.state.checkboxGroupValue1} onChange={(v)=>{
						console.log(v)
						this.setState({
							checkboxGroupValue1: v
						})
					}}>
						{opt}
					</Checkbox.Group>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Checkbox, 以配置项形式设置子元素: </h3>
					<Checkbox.Group name='cbox4' options={opts2} value={this.state.checkboxGroupValue2} onChange={(v)=>{
						console.log(v)
						this.setState({
							checkboxGroupValue2: v
						})
					}} />
				</div>
			</div>
		)
	}
}