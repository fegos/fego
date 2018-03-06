import React, { Component } from 'react';
import BaseForm from './Base';
import AdvanceForm from './Advance';
import style from './index.less';

export default class Home extends Component {
  state = {

  }
  render() {
    return (
      <div className={style.page}>
        <div className="section">
          <h3>表单的布局方式：</h3>
          <BaseForm />
        </div>
        <div className="section">
          <h3>使用 create 包装表单（未完成）：</h3>
          <AdvanceForm />
        </div>
      </div>
    );
  }
}
