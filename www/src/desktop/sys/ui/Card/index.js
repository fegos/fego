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
            <Card title="card title" hoverable={false}>
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
            <Card cover="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520502215780&di=f78971db8261dbf8c758bd6f40626d93&imgtype=0&src=http%3A%2F%2Fimg18.3lian.com%2Fd%2Ffile%2F201705%2F27%2F9ed0aa2c7f1f02128b64247254da5bec.jpg">
              <p>card content</p>
              <p>card content</p>
              <p>card content</p>
            </Card>
          </div>

          <div className="section">
            <h3>无边框的卡片：</h3>
            <Card title="card title" border={false} cover="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520502681319&di=5a1905ec9c7b6f9fb109afffa51b7abb&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2Ff4f4c038324150f08d916f26ba09d1277cb61b2a.jpg">
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
