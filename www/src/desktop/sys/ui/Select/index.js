import React, { Component } from 'react';
import { Select } from 'fego';
import style from './index.less';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: 'asy',
    };
  }
  render() {
    const opts = [<Select.Option value="asy" key="0">asy</Select.Option>,
      <Select.Option value="lucky" key="1">lucky</Select.Option>,
      <Select.Option value="disabled" disabled key="2">disabled</Select.Option>,
      <Select.Option value="1" key="3">333</Select.Option>,
      <Select.Option value="2" key="4">444</Select.Option>,
      <Select.Option value="3" key="5">555</Select.Option>];

    return (
      <div className={style.page}>
        <div className="section">
          <h3>使用非受控属性 defaultValue 的下拉框: </h3>
          <Select
            showClear
            defaultValue="lucky"
            onChange={(v) => { console.log('1 change'); }}
            onFocus={() => { console.log('1 focus'); }}
            onBlur={() => { console.log('1 blur'); }}
          >{opts}
          </Select>
        </div>
        <div className="section">
          <h3>使用受控属性 value 的下拉框: </h3>
          <Select
            value={this.state.selectValue}
            onChange={(v) => { console.log('2 change', v); this.setState({ selectValue: v }); }}
            onFocus={() => { console.log('2 focus'); }}
            onBlur={() => { console.log('2 blur'); }}
          >{opts}
          </Select>
        </div>
        <div className="section">
          <h3>无默认选中值的下拉框: </h3>
          <Select placeholder="placeholder">{opts}</Select>
        </div>
        <div className="section">
          <h3>下拉框尺寸: </h3>
          <Select size="small">{opts}</Select>
          <Select>{opts}</Select>
          <Select size="large">{opts}</Select>
        </div>
        <div className="section">
          <h3>禁用的下拉框: </h3>
          <Select disabled defaultValue="disabled">{opts}</Select>
        </div>
      </div>
    );
  }
}
