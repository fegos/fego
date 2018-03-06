import React, { Component } from 'react';
import { Button, Form, Input } from 'fego';

class AdvanceForm extends Component {
  state = {
    loading: false,
  }
  onSubmit = (params) => {
    console.log('submit: ', params);
  }
  onReset = (e) => {
    e.preventDefault();
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue();
    // console.log(values);
  }
  render() {
    return (
      <div>
        <div className="form">
          <Form onSubmit={this.onSubmit} onReset={this.onReset}>
            <Form.Item label="姓名" name="username2" required initialValue="asy" >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item label="密码" name="password2" required>
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

AdvanceForm = Form.create(AdvanceForm, {});

export default AdvanceForm;
