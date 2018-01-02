import style from './index.less'
import React, { Component } from 'react'
import { Card, Fetch, Button, Icon, Carousel, Input, Select, Checkbox, Radio, Form } from 'fego'

class CreateForm extends Component{
	state = {
		layout: 'vertical',
		itemLayout: 'vertical'
	}
	onSubmit = (params) => {
		console.log('submit: ', params)
	}
	onReset = (e) => {
		e.preventDefault();
		let { getFieldsValue } = this.props.form;
		getFieldsValue()
		console.log(this.refs.form.state)
	}
	render() {
		return (
			<div style={this.state.layout === 'vertical' ? {width: '500px'} : {}}>
				<Button onClick={() => {this.setState({
					layout: 'vertical',
					itemLayout: 'vertical'
				})}}>form 垂直布局 item 垂直布局</Button>
				<Button onClick={() => {this.setState({
					layout: 'vertical',
					itemLayout: 'horizontal'
				})}}>form 垂直布局 item 水平布局</Button>
				<Button onClick={() => {this.setState({
					layout: 'horizontal',
					itemLayout: 'vertical'
				})}}>form 水平布局, item 垂直布局, 按钮居右</Button>
				<Button onClick={() => {this.setState({
					layout: 'horizontal',
					itemLayout: 'horizontal'
				})}}>form 水平布局, item 水平布局, 按钮居右</Button>
				<Button onClick={() => {this.setState({
					layout: 'horizontal-inline',
					itemLayout: 'vertical'
				})}}>form 水平布局, item 垂直布局, 按钮尾随</Button>
				<Button onClick={() => {this.setState({
					layout: 'horizontal-inline',
					itemLayout: 'horizontal'
				})}}>form 水平布局, item 水平布局, 按钮尾随</Button>
				<Form ref='form' onSubmit={this.onSubmit} onReset={this.onReset} layout={this.state.layout} itemLayout={this.state.itemLayout}>
					<Form.Item label='姓名' name='username' required initialValue='asy' >
						<Input placeholder='请输入姓名' onChange={()=>{console.log('我变了，哈哈哈哈')}}/>
					</Form.Item>
					<Form.Item label='密码' name='password' required>
						<Input placeholder='请输入密码' type='password'/>
					</Form.Item>
					<Form.Btns>
						<Button type='primary' htmlType='submit'>确定</Button>
						<Button htmlType='reset'>重置</Button>
					</Form.Btns>
				</Form>
			</div>
		)
	}
}

CreateForm = Form.create(CreateForm, {})

export default class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: 'value',
			value2: 'value',
			selectValue: 'asy',
			checked1: true,
			checked2: false,
			radio1: true,
			radio2: false,
			radioGroupValue1: 'mat',
			radioGroupValue2: 'bio',
			checkboxGroupValue1: ['eng'],
			checkboxGroupValue2: ['phy'],
		}
	}
	componentDidMount() {
		// Fetch.post('test', { a: 1 })
	}
	render() {
		let opts = [<Select.Option value='asy' key='0'>asy</Select.Option>,
			<Select.Option value='lucky' key='1'>lucky</Select.Option>,
			<Select.Option value='disabled' disabled key='2'>disabled</Select.Option>]
		let opts2 = [
			<Radio value='chi' key='0'>语文</Radio>,
			<Radio value='mat' key='1'>数学</Radio>,
			<Radio value='eng' key='2'>英语</Radio>,
			<Radio value='phy' key='3'>物理</Radio>,
			<Radio value='che' key='4'>化学</Radio>,
			<Radio value='bio' key='5'>生物</Radio>
		];
		let opts3 = [
			{ label: '语文', value: 'chi' },
			{ label: '数学', value: 'mat' },
			{ label: '英语', value: 'eng', disabled: true },
			{ label: '物理', value: 'phy'},
			{ label: '化学', value: 'che'},
			{ label: '生物', value: 'bio'},
		];
		let opts4 = [
			<Checkbox value='chi' key='0'>语文</Checkbox>,
			<Checkbox value='mat' key='1'>数学</Checkbox>,
			<Checkbox value='eng' key='2'>英语</Checkbox>,
			<Checkbox value='phy' key='3'>物理</Checkbox>,
			<Checkbox value='che' key='4'>化学</Checkbox>,
			<Checkbox value='bio' key='5'>生物</Checkbox>
		];

		return (
			<div className={style.page}>
				
				<CreateForm />
				
				<a href="#">测试样式</a>
				<Card />
				<Icon name="plus" style={{ fontSize: '14px', color: 'red', margin: 10 }} />
				<div className={style.hoverIcon}>
					<Icon name="no" size='28px' style={{ margin: 10 }}/>
				</div>
				<Button disabled>disabled Button</Button>
				<Button loading>loading Button</Button>
				<Button type="primary">primary Button</Button>
				<Button type="primary" disabled>disabled primary Button</Button>
				<Button type="default">default Button</Button>
				<Button type="danger">danger Button</Button>
				<Button type="danger" disabled>disabled danger Button</Button>
				<Button type="ghost">ghost Button</Button>
				<Button type="ghost" disabled>disabled ghost Button</Button>
				<Button dashed>dashed Button</Button>
				<Button shape="circle" icon='plus'></Button>
				<Button shape="circle" dashed>cd</Button>
				<Button size='small'>small Button</Button>
				<Button size='large'>large Button</Button>
				
				<Carousel {...{
					dots: true,
					arrows: true,
					infinite: true,
					speed: 500,
					slidesToShow: 2,
					slidesToScroll: 2,
					draggable: true
				}}>
					<div><h3>1</h3></div>
					<div><h3>2</h3></div>
					<div><h3>3</h3></div>
					<div><h3>4</h3></div>
					<div><h3>5</h3></div>
					<div><h3>6</h3></div>
				</Carousel>

				<div style={{ width: '50vw', marginTop: '10px' }}>
					<h3>Input</h3>
					<Input prefix={<Icon name="plus" />} onPressEnter={(v) => { console.log(v) }} value={this.state.value} onChange={(value) => { this.setState({ value }) }} />
					<Input suffix={<Icon name="minus" />} placeholder='请输入' />
					<Input prefix={<Icon name="plus" />}
						suffix={<Icon name="minus" />} placeholder='请输入' />
					<Input showClear={true} onPressEnter={(e) => { console.log(e) }} defaultValue='default value' />
					<Input size='large' prefix={<Icon name="plus" />} showClear={true} defaultValue='large input with prefix and clear' placeholder='large input with prefix and clear' />
					<Input size='small' prefix={<Icon name="plus" />} showClear={true} defaultValue='small input with prefix and clear' placeholder='small input with prefix and clear' />
					<Input disabled defaultValue='disabled' />
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>TextArea</h3>
					<Input.TextArea autoSize={{
						maxRows: 6,
						minRows: 2
					}} defaultValue='defaultValue' placeholder='456' resize={false}/>
					<Input.TextArea autoSize={true} value={this.state.value2} placeholder='456' onChange={(value2) => { this.setState({ value2 }) }}/>
					<Input.TextArea disabled placeholder='789' />
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>Select</h3>
					<Select showClear 
						defaultValue='lucky' 
						onChange={(v)=>{console.log('1 change')}}
						onFocus={()=>{console.log('1 focus')}}
						onBlur={()=>{console.log('1 blur')}}
					>{opts}</Select>
					<Select value={this.state.selectValue} 
						onChange={(v)=>{console.log('2 change', v);this.setState({selectValue: v})}}
						onFocus={()=>{console.log('2 focus')}}
						onBlur={()=>{console.log('2 blur')}}
					>{opts}</Select>
					<Select placeholder='placeholder'>{opts}</Select>
					<Select size='small'>{opts}</Select>
					<Select size='large'>{opts}</Select>
					<Select disabled defaultValue='disabled'>{opts}</Select>
				</div>

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
						{opts4}
					</Checkbox.Group>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Checkbox, 带 defaultValue: </h3>
					<Checkbox.Group name='cbox2' defaultValue={['chi']} onChange={(v)=>{console.log(v)}}>
						{opts4}
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
						{opts4}
					</Checkbox.Group>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Checkbox, 以配置项形式设置子元素: </h3>
					<Checkbox.Group name='cbox4' options={opts3} value={this.state.checkboxGroupValue2} onChange={(v)=>{
						console.log(v)
						this.setState({
							checkboxGroupValue2: v
						})
					}} />
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>单独使用的 Radio</h3>
					<Radio defaultChecked={true} onChange={(e)=>{console.log(e.target.checked)}}>使用defaultChecked=true</Radio>
					<Radio value='1' defaultChecked={false} onChange={(e)=>{console.log(e.target.checked,e.target.value)}}>使用defaultChecked=false</Radio>
					<Radio checked={this.state.radio1} onChange={(e)=>{console.log(e.target.checked);this.setState({radio1: e.target.checked})}}>使用checked=true</Radio>
					<Radio value='2' checked={this.state.radio2} onChange={(e)=>{console.log(e.target.checked,e.target.value);this.setState({radio2: e.target.checked})}}>使用checked=false</Radio>
					<Radio disabled checked={true} >disabled</Radio>
					<Radio disabled checked={false} >disabled</Radio>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Radio，不带 defaultValue: </h3>
					<Radio.Group name='course1' onChange={(value)=>{console.log(value)}}>
						{opts2}
					</Radio.Group>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Radio，带 defaultValue: </h3>
					<Radio.Group name='course2' defaultValue='che' onChange={(value)=>{console.log(value)}}>
						{opts2}
					</Radio.Group>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Radio，带 value: </h3>
					<Radio.Group name='course3' value={this.state.radioGroupValue1} onChange={(value)=>{this.setState({
						radioGroupValue1: value
					})}}>
						{opts2}
					</Radio.Group>
				</div>

				<div style={{marginTop: '10px'}}>
					<h3>组合使用的 Radio，以配置项形式设置子元素: </h3>
					<Radio.Group name='course4' options={opts3} value={this.state.radioGroupValue2} onChange={(value)=>{this.setState({
						radioGroupValue2: value
					})}} />
				</div>

				
			</div>
		)
	}
}
