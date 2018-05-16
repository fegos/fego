---
title: Card
subTitle: 卡片
---

# 卡片 Card

### 组件描述
- 以卡片的形式展示一些图文数据。

### 示例代码

```html
<Card title="card title" hoverable={false}>
  <p>card content</p>
  <p>card content</p>
  <p>card content</p>
</Card>
```

## API

### props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| className | 样式类名，可用于覆盖默认样式 | string |  |
| title | 卡片标题 | string |  |
| border | 卡片是否有边框 | boolean | true |
| hoverable | 鼠标移过时是否浮起 | boolean | true |
| cover | 封面图，可以是图片的地址，也可以是element | react node |  |
| footer | 卡片底部，可接受数组、字符串、element类型数组| react node |  |
