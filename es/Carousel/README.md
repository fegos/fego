---
title: Carousel
subTitle: 走马灯
---

# Carousel走马灯


## API

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| dots | 是否显示面板指示点 | boolean   | true |
| vertical | 垂直显示 | boolean   | false |
| autoplay | 是否自动切换 | boolean   | false |
| easing | 动画效果 | string   | linear |
| beforeChange      | 切换面板的回调                              | function(from, to) | 无
| afterChange       | 切换面板的回调                              | function(current)  | 无

更多参数可参考：https://github.com/akiran/react-slick

### [Demos](http://neostack.com/opensource/react-slick)

### [PlayGround](https://jsfiddle.net/kirana/20bumb4g/)
Use [jsfiddle template](https://jsfiddle.net/kirana/20bumb4g/) to try react-slick with different settings.

### Example

```js
var React = require('react');
var Slider = require('react-slick');

class SimpleSlider extends React.Component {
  render: function () {
    return (
      <Slider {...{
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
		}}>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
        <div><h3>6</h3></div>
      </Slider>
    );
  }
}
```

|    Property    | Type |          Description          | Working |
| -------------  | ---- |          -----------          | ------- |
| accessibility  | bool | Enables tabbing and arrow key navigation | Yes |
| className      | String |Additional class name for the inner slider div | Yes |
| adaptiveHeight | bool | Adjust the slide's height automatically | Yes |
| arrows         | bool | Should we show Left and right nav arrows | Yes |
| nextArrow      | React Element | Use this element for the next arrow button [Example](https://github.com/akiran/react-slick/blob/master/examples/CustomArrows.js) | Yes |
| prevArrow      | React Element | Use this element for the prev arrow button [Example](https://github.com/akiran/react-slick/blob/master/examples/CustomArrows.js) | Yes |
| autoplay       | bool | Should the scroller auto scroll? | Yes |
| autoplaySpeed  |  int | delay between each auto scoll. in ms | Yes |
| centerMode     | bool | Should we centre to a single item? | Yes |
| centerPadding  | | | |
| cssEase        | | | |
| customPaging   | func | Custom paging templates. [Example](https://github.com/akiran/react-slick/blob/master/examples/CustomPaging.js)| Yes |
| dots           | bool | Should we show the dots at the bottom of the gallery | Yes |
| dotsClass      | string | Class applied to the dots if they are enabled | Yes |
| draggable      | bool | Is the gallery scrollable via dragging on desktop? | Yes |
| easing         | string | | |
| fade           | bool | Slides use fade for transition  | Yes |
| focusOnSelect  | bool | Go to slide on click | Yes |
| infinite       | bool | should the gallery wrap around its contents | Yes |
| initialSlide   | int | which item should be the first to be displayed | Yes |
| lazyLoad       | bool | Loads images or renders components on demands | Yes |
| pauseOnHover   | bool | prevents autoplay while hovering | Yes |
| responsive     | array | Array of objects in the form of `{ breakpoint: int, settings: { ... } }` The breakpoint _int_ is the `maxWidth` so the settings will be applied when resolution is below this value. Breakpoints in the array should be ordered from smallest to greatest. Use 'unslick' in place of the settings object to disable rendering the carousel at that breakpoint. Example: `[ { breakpoint: 768, settings: { slidesToShow: 3 } }, { breakpoint: 1024, settings: { slidesToShow: 5 } }, { breakpoint: 100000, settings: 'unslick' } ]`| Yes |
| rtl            | bool | Reverses the slide order | Yes |
| slide         | string |||
| slidesToShow | int | Number of slides to be visible at a time | Yes |
| slidesToScroll | int | Number of slides to scroll for each navigation item
| speed | int |||
| swipe | bool |||
| swipeToSlide | bool | Allow users to drag or swipe directly to a slide irrespective of slidesToScroll | Yes |
| touchMove | bool |||
| touchThreshold | int |||
| variableWidth | bool |||
| useCSS | bool | Enable/Disable CSS Transitions | Yes |
| vertical | bool | Vertical slide mode | Yes |
| afterChange | function | callback function called after the current index changes | Yes |
| beforeChange | function | callback function called before the current index changes | Yes |
| slickGoTo | int | go to the specified slide number | |


### Methods
* `slickNext()`   - function called to change current slide on next slide ([Example](https://github.com/akiran/react-slick/blob/master/examples/PreviousNextMethods.js))
* `slickPrev()`   - function called to change current slide on previous slide ([Example](https://github.com/akiran/react-slick/blob/master/examples/PreviousNextMethods.js))
* `slickGoTo(slideNumber)` - function called to change current slide to given slide number ([Example](https://github.com/akiran/react-slick/blob/master/examples/SlickGoTo.js))
