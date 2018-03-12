import React, { Component } from 'react';
import { Loading, Button } from 'fego';
import style from './index.less';

export default class Page extends Component {
  state = {
    loading: false,
  }
  render() {
    const ctn = (
      <div>
        <p>静安寺看得见啊路上看见宽带连接达康书记看来大家卡洛斯建档立卡数据的拉克丝几大块垃圾堆拉看见角度看撒量较大克鲁赛德
        三代目三代目三，没懂你，阿森纳动漫的美少女们，按摩师，都那么，都那么三的面试，那
        </p>
      </div>
    );
    return (
      <div className={style.page}>
        <div className="section">
          <p className="title">柱状加载中状态：</p>
          <Loading loading >
            {ctn}
          </Loading>
        </div>
        <div className="section">
          <p className="title">圆形加载中状态：</p>
          <Loading loading type="circle" >
            {ctn}
          </Loading>
        </div>
        <div className="section">
          <p className="title">带自定义文案的加载中状态：</p>
          <Loading loading type="bar" tip="正在拼命加载，别催，再催砍人了！！" >
            {ctn}
          </Loading>
        </div>
        <div className="section size">
          <p className="title">不同尺寸：</p>
          <Loading loading type="bar" size="small" />
          <Loading loading type="bar" />
          <Loading loading type="bar" size="large" />
          <Loading loading type="circle" size="small" />
          <Loading loading type="circle" />
          <Loading loading type="circle" size="large" />
        </div>
        <div className="section">
          <p className="title">带延迟：</p>
          <Button onClick={() => { this.setState({ loading: !this.state.loading }); }}>点击切换加载中状态</Button>
          <Loading delay={1000} loading={this.state.loading} >
            {ctn}
          </Loading>
        </div>
      </div>
    );
  }
}
