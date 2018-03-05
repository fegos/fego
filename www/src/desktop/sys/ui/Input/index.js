import React, { Component } from 'react';
import { Input, Icon } from 'fego';
import style from './index.less';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'value',
      value2: 'value',
    };
  }
  render() {
    return (
      <div className={style.page}>
        <div style={{ width: '400px' }}>
          <h3>Input</h3>
          <div className="section">
            <h3>默认使用非受控属性 defaultValue: </h3>
            <Input placeholder="请输入" />
          </div>
          <div className="section">
            <h3>使用受控属性 value, 带前缀的输入框: </h3>
            <Input prefix={<Icon name="plus" />} onPressEnter={(v) => { console.log(v); }} value={this.state.value} onChange={(value) => { this.setState({ value }); }} />
          </div>
          <div className="section">
            <h3>使用 defaultValue 带前后缀的输入框: </h3>
            <Input prefix={<Icon name="plus" />} suffix={<Icon name="minus" />} placeholder="请输入" />
          </div>
          <div className="section">
            <h3>显示清除按钮的输入框: </h3>
            <Input showClear onPressEnter={(e) => { console.log(e); }} defaultValue="default value" />
          </div>
          <div className="section size">
            <h3>输入框尺寸: </h3>
            <Input size="small" placeholder="small size input" />
            <Input placeholder="default size input" />
            <Input size="large" placeholder="large size input" />
          </div>
          <div className="section">
            <h3>禁用的输入框: </h3>
            <Input disabled defaultValue="disabled" />
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3>TextArea</h3>
          <div className="section">
            <h3>文本输入框，最小高度2行，最大高度6行: </h3>
            <Input.TextArea
              autoSize={{
                maxRows: 6,
                minRows: 2,
              }}
              defaultValue="defaultValue"
              placeholder="456"
              resize={false}
            />
          </div>

          <div className="section">
            <h3>文本输入框，不限制最大行高度: </h3>
            <Input.TextArea autoSize value={this.state.value2} placeholder="456" onChange={(value2) => { this.setState({ value2 }); }} />
          </div>

          <div className="section">
            <h3>禁用的文本输入框: </h3>
            <Input.TextArea disabled placeholder="789" />
          </div>
        </div>
      </div>
    );
  }
}
