import React, { Component } from 'react';
import { List } from 'fego';

export default class Page extends Component {
  state = {}
  render() {
    return (
      <div>
        <List>
          <List.Item title="list item 1" hasRightArrow={false} onClick={() => { console.log('list item 1 click'); }} />
          <List.Item title="list item 2" hasRightArrow extra={33333333333} onClick={() => { console.log('list item 2 click'); }} />
          <List.Item title="list item 3: 当文字较多时，默认会折行显示，设置 wrap 为 false 不折行，此时会截断并显示…" hasRightArrow onClick={() => { console.log('list item 4 click'); }} />
          <List.Item title="list item 4: nowrap and overflow will show ellipsis" wrap={false} hasRightArrow extra="overflow extra content will show ellipsis" iconName="question-o" onClick={() => { console.log('list item 3 click'); }} />
          {/*
            <List.Item title="list item 4: string extra and vertical align top" hasRightArrow extra="extra content" verticalAlign="top" onClick={() => { console.log('list item 4 click'); }} />
            <List.Item title="list item 5: span extra and vertical align bottom" hasRightArrow extra={<span>span extra</span>} verticalAlign="bottom" onClick={() => { console.log('list item 5 click'); }} />
          */}
          <List.Item title="list item 5: with subTitle" subTitle="this is subtitle" hasRightArrow extra="extra" onClick={() => { console.log('list item 6 click'); }} />
          <List.Item title="list item 6: 左滑有惊喜" slip onClick={() => { console.log('list item 7 click'); }} onSlipItemClick={() => { console.log('发起请求做一些事情'); }} />
          <List.Item title="list item 7: 使用 children" ><span>span children</span></List.Item>
        </List>
      </div>
    );
  }
}
