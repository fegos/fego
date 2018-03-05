import React from 'react';
import { Carousel } from 'fego';
import NewsSliderList from './NewsSliderList';
import style from './index.less';

export default class NewsSlider extends React.Component {
  render() {
    return (
      <div className={style.page}>
        <div className={`${style.news}`} >
          <h2 className={style.title}>农产品头条</h2>
          <div className={`${style.sliderBox} f-cb`} >
            <Carousel
              ref={(el) => { this.slick = el && el.slick; }}
              {...{
                autoplay: true,
                autoplaySpeed: 3000,
                dots: true,
                infinite: true,
                vertical: true,
                verticalSwiping: true,
                swipeToSlide: true,
                arrows: true,
                // ...this.state,
                beforeChange: (currentSlide, nextSlide) => {
                  this.sliderList && this.sliderList.switch(nextSlide);
                },
              }}
            >
              <img src={require('./img/rice.png')} alt="" />
              <img src={require('./img/exhibition.png')} alt="" />
              <img src={require('./img/corn.png')} alt="" />
            </Carousel>
            <NewsSliderList
              ref={(el) => { this.sliderList = el; }}
              onEnter={() => {
                // this.setState({
                //    autoplay: false
                // })
                this.slick.innerSlider.pause();
              }}
              onLeave={() => {
                // this.setState({
                //   autoplay: true
                // })
                this.slick.innerSlider.autoPlay();
              }}
              onChange={(cur) => {
                // this.setState({
                //   slickGoTo: cur
                // })
                // this.slick.slickGoTo(cur);
                setTimeout(() => {
                  this.slick.slickGoTo(cur);
                  this.slick.innerSlider.pause();
                });
                // this.slick.innerSlider.pause();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
