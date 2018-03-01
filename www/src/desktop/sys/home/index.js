import React, { Component } from 'react';
import { Card, Button, Icon, Carousel, Input, Form } from 'fego';
import style from './index.less';

class CreateForm extends Component {
  state = {
    layout: 'vertical',
    itemLayout: 'vertical',
  }
  onSubmit = (params) => {
    console.log('submit: ', params);
  }
  onReset = (e) => {
    e.preventDefault();
    const { getFieldsValue } = this.props.form;
    getFieldsValue();
    console.log(this.formRef.state);
  }
  render() {
    return (
      <div style={this.state.layout === 'vertical' ? { width: '500px' } : {}}>
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
        <Form ref={(i) => { this.formRef = i; }} onSubmit={this.onSubmit} onReset={this.onReset} layout={this.state.layout} itemLayout={this.state.itemLayout}>
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
    );
  }
}

CreateForm = Form.create(CreateForm, {});

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {
    // Fetch.post('test', { a: 1 })
  }
  render() {
    return (
      <div className={style.page}>

        <CreateForm />

        <a href="#">测试样式</a>
        <Card />
        <Icon name="plus" style={{ fontSize: '14px', color: 'red', margin: 10 }} />
        <div className={style.hoverIcon}>
          <Icon name="no" size="28px" style={{ margin: 10 }} />
        </div>

        <Carousel {...{
          dots: true,
          arrows: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 2,
          draggable: true,
        }}
        >
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Carousel>
      </div>
    );
  }
}
