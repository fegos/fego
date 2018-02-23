import React, { Component } from 'react'
import { Button } from 'fego'
import style from './index.less'

export default class Page extends Component {
	render() {
		return (
			<div className={style.page}>
				<div className='section'>
					<span>默认按钮：</span>
					<Button type="default">default Button</Button>
					<Button disabled>disabled default Button</Button>
				</div>
				<div className='section'>
					<span>加载中状态：</span>
					<Button loading>loading Button</Button>
				</div>
				<div className='section'>
					<span>主按钮：</span>
					<Button type="primary">primary Button</Button>
					<Button type="primary" disabled>disabled primary Button</Button>
				</div>
				<div className='section'>
					<span>危险按钮：</span>
					<Button type="danger">danger Button</Button>
					<Button type="danger" disabled>disabled danger Button</Button>
				</div>
				<div className='section ghost'>
					<span>幽灵按钮：</span>
					<Button type="ghost">ghost Button</Button>
					<Button type="ghost" disabled>disabled ghost Button</Button>
				</div>
				<div className='section'>
					<span>虚线按钮：</span>
					<Button dashed>dashed Button</Button>
				</div>
				<div className='section'>
					<span>按钮尺寸：</span>
					<Button size='small'>small Button</Button>
					<Button>default size Button</Button>
					<Button size='large'>large Button</Button>
				</div>
				<div className='section'>
					<span>圆形按钮：</span>
					<Button shape="circle" icon='plus'></Button>
					<Button shape="circle" dashed>btn</Button>
				</div>
			</div>
		)
	}
}
