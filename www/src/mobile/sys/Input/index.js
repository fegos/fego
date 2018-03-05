import React, { Component } from 'react';
import { Input, Icon } from 'fego';

export default class Page extends Component {
  state = {
    value: 'value',
    value2: 'value',
  }
  render() {
    return (
      <div >
        <p className="title">默认使用非受控属性 defaultValue: </p>
        <Input placeholder="请输入" />

        <p className="title">使用受控属性 value, 带前缀的输入框: </p>
        <Input prefix={<Icon name="plus" />} onPressEnter={(v) => { console.log(v); }} value={this.state.value} onChange={(value) => { this.setState({ value }); }} />

        <p className="title">使用 defaultValue 带前后缀的输入框: </p>
        <Input prefix={<Icon name="plus" />} suffix={<Icon name="minus" />} placeholder="请输入" />

        <p className="title">显示清除按钮的输入框: </p>
        <Input showClear onPressEnter={(e) => { console.log(e); }} defaultValue="default value" />

        <p className="title">size large 输入框: </p>
        <Input size="large" prefix={<Icon name="plus" />} showClear defaultValue="large input with prefix and clear" placeholder="large input with prefix and clear" />

        <p className="title">size small 输入框: </p>
        <Input size="small" prefix={<Icon name="plus" />} showClear defaultValue="small input with prefix and clear" placeholder="small input with prefix and clear" />

        <p className="title">禁用的输入框: </p>
        <Input disabled defaultValue="disabled" />

        <p className="title">文本输入框，最小高度2行，最大高度6行: </p>
        <Input.TextArea
          autoSize={{
            maxRows: 6,
            minRows: 2,
          }}
          defaultValue="defaultValue"
          placeholder="456"
          resize={false}
        />

        <p className="title">文本输入框，不限制最大行高度: </p>
        <Input.TextArea autoSize value={this.state.value2} placeholder="456" onChange={(value2) => { this.setState({ value2 }); }} />

        <p className="title">禁用的文本输入框: </p>
        <Input.TextArea disabled placeholder="789" />
      </div>
    );
  }
}
