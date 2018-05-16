---
title: Loading
subTitle: 加载
---

# 加载 Loading

### 组件描述
- 用于显示加载中状态，此时内容不可操作


### 示例代码

```html
<Loading loading type="bar" size="large" />
<Loading loading type="circle" >
  <p>这是内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
  <p>这是内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
  <p>这是内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
  <p>这是内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
</Loading>
<Loading loading type={<Icon name="error" />} >
  <p>这是内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
</Loading>
```

## API

### props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| loading | 是否显示加载中 | boolean | true |
| type | 图标类型，可选 'bar', 'circle', 也可以自定义图标，此时需自行实现图标的动效 | react node | 'bar' |
| size | 图标尺寸，可选 'small', 'default', 'large' | string | 'default' |
| tip | 额外显示的文案 | string |  |
| delay | 时间延迟 | number | 0 |
