import React, { Component } from 'react'
import { Dialog, Button } from 'fego'

export default class Page extends Component {
	state = { 
		visible: false,

	}
	show = () => {
		this.setState({
			visible: true,
		});
	}
	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	showConfirmDialog = () => {
		Dialog.confirm({
			title: '你确定嘛？',
			content: '你想好了嘛？不要冲动，想好了再确定.',
			onOk: ()=>{console.log('confirm ok')},
			onCancel: ()=>{console.log('confirm cancel')}
		});
	}
	showInfoDialog = () => {
		Dialog.info({
			title: '提示提示提示',
			content: '看提示 OK？ 别瞎 OK？',
			onOk: ()=>{console.log('info ok')},
		});
	}
	showSuccessDialog = () => {
		Dialog.success({
			title: '成功 yeah ~',
			content: '恭喜恭喜，成功',
			onOk: ()=>{console.log('success, ok')},
		});
	}
	showErrorDialog = () => {
		Dialog.error({
			title: '失败 sigh ~',
			content: '哈哈哈哈，失败啦，很开心四八四',
			onOk: ()=>{console.log('error, ok')},
		});
	}
	showWarningDialog = () => {
		Dialog.warning({
			title: '警告 dingling ~',
			content: '报警了，没起火，放心',
			onOk: ()=>{console.log('warning, ok')},
		});
	}	
	render() {
		return (
			<div>
				<Button onClick={this.show}>传统方式打开对话框</Button>
				<Button onClick={this.showConfirmDialog} style={{marginTop: '20px'}}>api 方式打开 confirm 对话框</Button>
				<Button onClick={this.showInfoDialog} style={{marginTop: '20px'}}>api 方式打开 info 对话框</Button>
				<Button onClick={this.showWarningDialog} style={{marginTop: '20px'}}>api 方式打开 warning 对话框</Button>
				<Button onClick={this.showSuccessDialog} style={{marginTop: '20px'}}>api 方式打开 success 对话框</Button>
				<Button onClick={this.showErrorDialog} style={{marginTop: '20px'}}>api 方式打开 error 对话框</Button>

				<Dialog
					title="Basic Dialog"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Dialog>
			</div>
		)
	}
}