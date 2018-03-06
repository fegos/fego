import React, { Component } from 'react';
import { Button, Form, Input } from 'fego';

export default class BaseForm extends Component {
  state = {
    layout: 'vertical',
    itemLayout: 'vertical',
  }
  onSubmit = (params) => {
    console.log('submit: ', params);
  }
  onReset = () => {
    console.log('reset');
  }
  render() {
    return (
      <div>
        <div className="layoutBtns">
          <Button onClick={() => {
            this.setState({
              layout: 'vertical',
              itemLayout: 'vertical',
            });
          }}
          >form 垂直布局 item 垂直布局
          </Button>
          <Button onClick={() => {
            this.setState({
              layout: 'vertical',
              itemLayout: 'horizontal',
            });
          }}
          >form 垂直布局 item 水平布局
          </Button>
          <Button onClick={() => {
            this.setState({
              layout: 'horizontal',
              itemLayout: 'vertical',
            });
          }}
          >form 水平布局, item 垂直布局, 按钮居右
          </Button>
          <Button onClick={() => {
            this.setState({
              layout: 'horizontal',
              itemLayout: 'horizontal',
            });
          }}
          >form 水平布局, item 水平布局, 按钮居右
          </Button>
          <Button onClick={() => {
            this.setState({
              layout: 'horizontal-inline',
              itemLayout: 'vertical',
            });
          }}
          >form 水平布局, item 垂直布局, 按钮尾随
          </Button>
          <Button onClick={() => {
            this.setState({
              layout: 'horizontal-inline',
              itemLayout: 'horizontal',
            });
          }}
          >form 水平布局, item 水平布局, 按钮尾随
          </Button>
        </div>
        <div className="form">
          <Form onSubmit={this.onSubmit} onReset={this.onReset} layout={this.state.layout} itemLayout={this.state.itemLayout}>
            <Form.Item label="姓名" name="username" required initialValue="asy" >
              <Input placeholder="请输入姓名" onChange={() => { console.log('我变了，哈哈哈哈'); }} />
            </Form.Item>
            <Form.Item label="密码" name="password" required>
              <Input placeholder="请输入密码" type="password" />
            </Form.Item>
            <Form.Btns>
              <Button type="primary" htmlType="submit">确定</Button>
              <Button htmlType="reset">重置</Button>
            </Form.Btns>
          </Form>
        </div>
      </div>
    );
  }
}
