# 移动端屏幕适配

https://www.w3cplus.com/css/vw-for-layout.html
https://zhuanlan.zhihu.com/p/25216275

## 名词概念：
### 设备像素（Device Pixels）：
设备屏幕的物理像素，单位是px，比如iPhone6的750x1334px
### 逻辑像素（CSS Pixels）：
是Web编程的概念，指的是CSS样式代码中使用的逻辑像素
### 像素密度：
也叫显示密度或者屏幕密度，缩写为DPI(Dots Per Inch)或者PPI(Pixel Per Inch)。每英寸点数=屏幕对角线的像素 / 屏幕对角线的尺寸（inch）
### DPR：
设备像素比(devicePixelRatio)是默认缩放为100%的情况下，设备(物理)像素和逻辑(CSS)像素的比值
以iphone5为例，iphone5的逻辑像素为320px*568px，DPR是2，设备像素为640px*1136px

## 视口（viewport）：
### 布局视口
### 视觉视口
### 理想视口（width=device-width）

## 适配方案

### vw方案
主流方案
### 特点
1. 使用vw来实现页面的适配，并且通过PostCSS的插件postcss-px-to-viewport把px转换成vw。这样的好处是，我们在撸码的时候，不需要进行任何的计算，你只需要根据设计图写px单位
2. 为了更好的实现长宽比，特别是针对于img、vedio和iframe元素，通过PostCSS插件postcss-aspect-ratio-mini来实现，在实际使用中，只需要把对应的宽和高写进去即可
3. 为了解决1px的问题，使用PostCSS插件postcss-write-svg,自动生成border-image或者background-image的图片
~~~js
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
~~~

#### 降级处理
2015年top30机型中还有几款机型是不支持vw的适配方案。那么如果业务需要，应该怎么处理呢？有两种方式可以进行降级处理：
+ CSS Houdini：通过CSS Houdini针对vw做处理，调用CSS Typed OM Level1 提供的CSSUnitValue API。
+ CSS Polyfill：通过相应的Polyfill做相应的处理，目前针对于vw单位的Polyfill主要有：vminpoly、Viewport Units Buggyfill、vunits.js和Modernizr。个人推荐采用Viewport Units Buggyfill

### rem方案
依照某特定宽度设定 rem 值（即 html 的 font-size），页面任何需要弹性适配的元素，尺寸均换算为 rem 进行布局；当页面渲染时，根据页面有效宽度进行计算，调整 rem 的大小，动态缩放以达到适配的效果。利用该方案，还可以根据 devicePixelRatio 设定 initial-scale 来放大 viewport，使页面按照物理像素渲染，提升清晰度。
### 定宽方案
width=750，视觉稿、页面宽度、viewport width 使用统一宽度，利用浏览器自身缩放完成适配。页面样式（包括图像元素）完全按照视觉稿的尺寸，使用定值单位 （px、em）即可完成。
### 定高方案
width=device-width，盒子css使用px，大屏稀松，小屏拥挤