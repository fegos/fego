import React, { Component } from 'react'
import { Button, Icon } from 'fego'

export default class Page extends Component {
	render() {
		return (
			<div>
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
				<div style={{ width: '50vw' }}>
					<Button size='small'>small Button</Button>
				</div>
				<div style={{ width: '50vw' }}>
					<Button size='large'>large Button</Button>
				</div>
			</div>
		)
	}
}