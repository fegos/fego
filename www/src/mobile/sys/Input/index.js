import React, { Component } from 'react'
import { Input, Icon } from 'fego'

export default class Page extends Component {
	state = { 
		value: 'value',
		value2: 'value',
	}
	render() {
		return (
			<div>
				<Input prefix={<Icon name="plus" />} onPressEnter={(v) => { console.log(v) }} value={this.state.value} onChange={(value) => { this.setState({ value }) }} />
				<Input suffix={<Icon name="minus" />} placeholder='请输入' />
				<Input prefix={<Icon name="plus" />}
					suffix={<Icon name="minus" />} placeholder='请输入' />
				<Input showClear={true} onPressEnter={(e) => { console.log(e) }} defaultValue='default value' />
				<Input size='large' prefix={<Icon name="plus" />} showClear={true} defaultValue='large input with prefix and clear' placeholder='large input with prefix and clear' />
				<Input size='small' prefix={<Icon name="plus" />} showClear={true} defaultValue='small input with prefix and clear' placeholder='small input with prefix and clear' />
				<Input disabled defaultValue='disabled' />
				<Input.TextArea autoSize={{
					maxRows: 6,
					minRows: 2
				}} defaultValue='defaultValue' placeholder='456' resize={false}/>
				<Input.TextArea autoSize={true} value={this.state.value2} placeholder='456' onChange={(value2) => { this.setState({ value2 }) }}/>
				<Input.TextArea disabled placeholder='789' />
			</div>
		)
	}
}