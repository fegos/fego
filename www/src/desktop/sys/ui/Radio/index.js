import React, { Component } from 'react';
import { Radio } from 'fego';
import style from './index.less';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radio1: true,
      radio2: false,
      radioGroupValue1: 'mat',
      radioGroupValue2: 'bio',
    };
  }
  render() {
    const opt = [
      <Radio value="chi" key="0">语文</Radio>,
      <Radio value="mat" key="1">数学</Radio>,
      <Radio value="eng" key="2">英语</Radio>,
      <Radio value="phy" key="3">物理</Radio>,
      <Radio value="che" key="4">化学</Radio>,
      <Radio value="bio" key="5">生物</Radio>,
    ];

    const opt2 = [
      { label: '语文', value: 'chi' },
      { label: '数学', value: 'mat' },
      { label: '英语', value: 'eng', disabled: true },
      { label: '物理', value: 'phy' },
      { label: '化学', value: 'che' },
      { label: '生物', value: 'bio' },
    ];

    return (
      <div className={style.page}>
        <div className="section">
          <p className="title">单独使用的 Radio: </p>
          <Radio defaultChecked onChange={(e) => { console.log(e.target.checked); }}>使用defaultChecked=true</Radio>
          <Radio value="1" defaultChecked={false} onChange={(e) => { console.log(e.target.checked, e.target.value); }}>使用defaultChecked=false</Radio>
          <Radio checked={this.state.radio1} onChange={(e) => { console.log(e.target.checked); this.setState({ radio1: e.target.checked }); }}>使用checked=true</Radio>
          <Radio value="2" checked={this.state.radio2} onChange={(e) => { console.log(e.target.checked, e.target.value); this.setState({ radio2: e.target.checked }); }}>使用checked=false</Radio>
          <Radio disabled checked >disabled</Radio>
          <Radio disabled checked={false} >disabled</Radio>
        </div>

        <div className="section">
          <p className="title">Radio.Group: </p>
          <Radio.Group name="course1" onChange={(value) => { console.log(value); }}>
            {opt}
          </Radio.Group>
        </div>

        <div className="section">
          <p className="title">Radio.Group，使用非受控属性 defaultValue: </p>
          <Radio.Group name="course2" defaultValue="che" onChange={(value) => { console.log(value); }}>
            {opt}
          </Radio.Group>
        </div>

        <div className="section">
          <p className="title">Radio.Group，使用受控属性 value: </p>
          <Radio.Group
            name="course3"
            value={this.state.radioGroupValue1}
            onChange={(value) => {
              this.setState({
                radioGroupValue1: value,
              });
            }}
          >
            {opt}
          </Radio.Group>
        </div>

        <div className="section">
          <p className="title">Radio.Group，以配置项形式设置子元素: </p>
          <Radio.Group
            name="course4"
            options={opt2}
            value={this.state.radioGroupValue2}
            onChange={(value) => {
              this.setState({
                radioGroupValue2: value,
              });
            }}
          />
        </div>
      </div>
    );
  }
}
