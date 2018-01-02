import React, { Component } from 'react'
import { List } from 'fego'

export default class Page extends Component {
	render() {
		return (
			<div>
				<List>
					<List.Item title='list item 1' hasRightArrow={false} onClick={()=>{console.log('list item 1 click')}}></List.Item>
					<List.Item title='list item 2' hasRightArrow={true} extra={33333333333} onClick={()=>{console.log('list item 2 click')}} ></List.Item>
					<List.Item title='list item 3: nowrap and overflow will show ellipsis' wrap={false} hasRightArrow={true} extra='overflow extra content will show ellipsis' iconName='question-o' onClick={()=>{console.log('list item 3 click')}}></List.Item>
					<List.Item title='list item 4: string extra and vertical align top' hasRightArrow={true} extra='extra content' verticalAlign='top' onClick={()=>{console.log('list item 4 click')}}></List.Item>
					<List.Item title='list item 5: span extra and vertical align bottom' hasRightArrow={true} extra={<span>span extra</span>} verticalAlign='bottom' onClick={()=>{console.log('list item 5 click')}}></List.Item>
					<List.Item title='list item 6: with subTitle' subTitle='this is subtitle' hasRightArrow={true} extra='extra' onClick={()=>{console.log('list item 6 click')}} ></List.Item>
					<List.Item title='list item 7: 左滑有惊喜' slip={true} onClick={()=>{console.log('list item 7 click')}} onSlipItemClick={()=>{console.log('发起请求做一些事情')}}></List.Item>
					<List.Item title='list item 8: 使用 children' ><span>span children</span></List.Item>
				</List>
			</div>
		)
	}
}