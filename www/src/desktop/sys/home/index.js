import React, { Component } from 'react';
import { Card, Icon, Carousel } from 'fego';
import style from './index.less';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {
    // Fetch.post('test', { a: 1 })
  }
  render() {
    return (
      <div className={style.page}>
        <a href="#">测试样式</a>
        <Icon name="plus" style={{ fontSize: '14px', color: 'red', margin: 10 }} />
        <div className={style.hoverIcon}>
          <Icon name="no" size="28px" style={{ margin: 10 }} />
        </div>

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
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
          <div><h3>5</h3></div>
          <div><h3>6</h3></div>
        </Carousel>
      </div>
    );
  }
}
