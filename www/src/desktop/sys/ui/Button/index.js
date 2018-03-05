import React, { Component } from 'react';
import { Button } from 'fego';
import style from './index.less';

export default class Page extends Component {
  state = {}
  render() {
    return (
      <div className={style.page}>
        <div className="section">
          <h3>默认按钮：</h3>
          <Button type="default">default Button</Button>
          <Button disabled>disabled default Button</Button>
        </div>
        <div className="section">
          <h3>加载中状态：</h3>
          <Button loading>loading Button</Button>
        </div>
        <div className="section">
          <h3>主按钮：</h3>
          <Button type="primary">primary Button</Button>
          <Button type="primary" disabled>disabled primary Button</Button>
        </div>
        <div className="section">
          <h3>危险按钮：</h3>
          <Button type="danger">danger Button</Button>
          <Button type="danger" disabled>disabled danger Button</Button>
        </div>
        <div className="section ghost">
          <h3>幽灵按钮：</h3>
          <Button type="ghost">ghost Button</Button>
          <Button type="ghost" disabled>disabled ghost Button</Button>
        </div>
        <div className="section">
          <h3>虚线按钮：</h3>
          <Button dashed>dashed Button</Button>
        </div>
        <div className="section">
          <h3>按钮尺寸：</h3>
          <Button size="small">small Button</Button>
          <Button>default size Button</Button>
          <Button size="large">large Button</Button>
        </div>
        <div className="section">
          <h3>圆形按钮：</h3>
          <Button shape="circle" icon="plus" />
          <Button shape="circle" dashed>btn</Button>
        </div>
      </div>
    );
  }
}
