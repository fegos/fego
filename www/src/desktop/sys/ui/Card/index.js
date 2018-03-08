import React, { Component } from 'react';
import { Card, Icon } from 'fego';
import style from './index.less';

export default class Page extends Component {
  state = {}
  render() {
    return (
      <div className={style.page}>
        <div className="f-cb">
          <div className="section">
            <h3>简单卡片：</h3>
            <Card title="card title">
              <p>card content</p>
              <p>card content</p>
              <p>card content</p>
            </Card>
          </div>

          <div className="section">
            <h3>带底部文字的卡片：</h3>
            <Card title="card title" footer="card footer">
              <p>card content</p>
              <p>card content</p>
              <p>card content</p>
            </Card>
          </div>

          <div className="section">
            <h3>定制title和footer：</h3>
            <Card title={<Icon name="yes" />} footer={[<Icon name="plus" />, <Icon name="no" />]}>
              <p>card content</p>
              <p>card content</p>
              <p>card content</p>
            </Card>
          </div>

          <div className="section">
            <h3>带封面的卡片：</h3>
            <Card title="card title" cover="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521085830&di=298dc6ddf8ca5198a6ab2db61f1617e6&imgtype=jpg&er=1&src=http%3A%2F%2Fimgcache.tuwandata.com%2Fv2%2Fthumb%2Fall%2FZmIxYiw2MDAsMTAwLDQsMywxLC0xLDEsLCw5MA%3D%3D%2Fu%2Fwww.tuwan.com%2Fuploads%2Fallimg%2F1711%2F29%2F1323415915-0.jpg">
              <p>card content</p>
              <p>card content</p>
              <p>card content</p>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
