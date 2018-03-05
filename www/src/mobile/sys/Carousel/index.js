import React, { Component } from 'react';
import { Carousel } from 'fego';
import style from './index.less';

export default class Page extends Component {
  state = {}
  render() {
    const contents = [
      <div key="1"><h3>1</h3></div>,
      <div key="2"><h3>2</h3></div>,
      <div key="3"><h3>3</h3></div>,
      <div key="4"><h3>4</h3></div>,
      <div key="5"><h3>5</h3></div>,
      <div key="6"><h3>6</h3></div>,
    ];
    return (
      <div className={style.page}>
        <p className="title">自动切换的走马灯：</p>
        <Carousel {...{
          dots: true,
          arrows: true,
          infinite: true,
          speed: 500,
          autoplay: true,
          draggable: true,
        }}
        >
          {contents}
        </Carousel>

        <p className="title">一屏显示两页内容的走马灯：</p>
        <Carousel {...{
          dots: true,
          arrows: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 2,
          draggable: true,
        }}
        >
          {contents}
        </Carousel>
      </div>
    );
  }
}
