
import React from 'react';
import style from './index.less';

export default class NewsSliderList extends React.Component {
  state = {
    activePage: 0,
  }
  switch(cur) {
    this.setState({ activePage: cur });
  }
  render() {
    const { activePage } = this.state;
    const { onEnter, onLeave, onChange } = this.props;
    return (
      <div className={style.list} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <p className={activePage === 0 ? style.active : ''} onMouseEnter={() => onChange(0)}>
          <span className={style.triangle} />
          <a href="/news/industry/detail??newsId=news0926">龙商华泰与臻美农品达成合作 共同助力联社农业</a>
          <span>近日，黑龙江华泰商品交易中心有限公司与黑龙江集贤县臻美农品信息购销合作社联社达成合作，双方以绿色农业为指导理念，共同构建“企业+合作社+电子商务”的新型服务体系。围绕“互联网+农业”发展理念，精心致力于绿色有机食品的发展。</span>
        </p>
        <p className={activePage === 1 ? style.active : ''} onMouseEnter={() => onChange(1)}>
          <span className={style.triangle} />
          <a href="/news/industry/detail??newsId=news0810">科技兴农 龙商华泰携手黑龙江模范企业探索农业发展新模式</a>
          <span>近日，黑龙江华泰商品交易中心与黑龙江孙斌鸿源农业开发集团达成战略合作，双方秉持“与黑龙江当地优势资源结合，坚定服务实体经济”的定位，通过“互联网+农业”的方式展开深入合作，共同致力于推动黑龙江省农业科技化、现代化的发展。</span>
        </p>
        <p className={activePage === 2 ? style.active : ''} onMouseEnter={() => onChange(2)}>
          <span className={style.triangle} />
          <a href="/news/industry/detail?newsId=news0720">东北玉米收储市场化改革元年成效显著 玉米收储改革开局观察</a>
          <span>按照中央经济工作会议部署，抓好玉米收储制度改革，是2017年深入推进农业供给侧结构性改革的重要工作内容之一。近日，《瞭望》新闻周刊记者在东北地区调研了解到，2016年是东北玉米市场化改革第一年，玉米降价、加工回暖、进口减少，玉米市场流通更顺畅，我国玉米收储制度改革成效初现。</span>
        </p>
      </div>
    );
  }
}
