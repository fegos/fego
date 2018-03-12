import React, { Component } from 'react';
import { Button } from 'fego';
import style from './index.less';

export default class Page extends Component {
  state = {}
  render() {
    return (
      <div className={style.page}>
        <div className="section">
          <p className="title">默认按钮：</p>
          <Button type="default">default Button</Button>
          <Button disabled>disabled default Button</Button>
        </div>
        <div className="section">
          <p className="title">加载中状态：</p>
          <Button loading>loading Button</Button>
        </div>
        <div className="section">
          <p className="title">主按钮：</p>
          <Button type="primary">primary Button</Button>
          <Button type="primary" disabled>disabled primary Button</Button>
        </div>
        <div className="section">
          <p className="title">危险按钮：</p>
          <Button type="danger">danger Button</Button>
          <Button type="danger" disabled>disabled danger Button</Button>
        </div>
        <div className="section ghost">
          <p className="title">幽灵按钮：</p>
          <Button type="ghost">ghost Button</Button>
          <Button type="ghost" disabled>disabled ghost Button</Button>
        </div>
        <div className="section">
          <p className="title">虚线按钮：</p>
          <Button dashed>dashed Button</Button>
        </div>
        <div className="section">
          <p className="title">按钮尺寸：</p>
          <Button size="small">small Button</Button>
          <Button>default size Button</Button>
          <Button size="large">large Button</Button>
        </div>
        <div className="section">
          <p className="title">圆形按钮：</p>
          <Button shape="circle" icon="plus" />
          <Button shape="circle" dashed>btn</Button>
        </div>
      </div>
    );
  }
}
