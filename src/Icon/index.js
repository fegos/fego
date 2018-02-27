/**
 * 图标组件
 * @author esky
 */
import React from 'react'
import './font'
export default function Icon(props) {
  const { name, className = '', spin, size, width, height, hrefPrefix = 'nsicon', style, ...rest } = props;
  const cls = `${className} nsicon ${spin || name === 'loading' ? 'nsicon-spin' : ''}`.trim();
  let _style = { ...style, width: size || width, height: size || height };
  /**
  <!-- REACT JSX: -->
  <svg> <use xlinkHref='/svg/svg-sprite#my-icon' /> </svg>
  <!-- RENDERS AS: -->
  <svg> <use xlink:href="/svg/svg-sprite#my-icon"></use> </svg>
    */
  return <svg className={cls} style={_style} aria-hidden="true" {...rest}><use xlinkHref={`#${hrefPrefix}-${name}`} /></svg>
}
/**
symbol引用

这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章 这种用法其实是做了一个svg的集合，与另外两种相比具有如下特点：

支持多色图标了，不再受单色限制。
通过一些技巧，支持像字体那样，通过font-size,color来调整样式。
兼容性较差，支持 ie9+,及现代浏览器。
浏览器渲染svg的性能一般，还不如png。
 */
