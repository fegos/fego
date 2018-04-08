---
title: List
subTitle: 清单
---

# 加载 Loading

### 组件描述
- 以列表形式显示当前的内容、数组等
- 一般由主要信息、主要操作、次要信息、次要操作组成
- 主要信息和主要操作放在列表的左边，次要信息和次要操作放在列表的右边
- 该组件只适用于移动端



### 示例代码

```html
<List>
  <List.Item title="list item 1" hasRightArrow={false} />
  <List.Item title="list item 2" hasRightArrow extra="extra msg" />
  <List.Item title="list item 3: show icon and ellipsis" wrap={false} iconName="question-o" />
  <List.Item title="list item 4: with subTitle" subTitle="this is subtitle" />
  <List.Item title="list item 5: 左滑有惊喜" slip />
</List>
```

## API

### List.Item props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| title | 标题 | react node |  |
| subTitle | 副标题 | react node |  |
| children | 子元素，将直接作为标题来渲染，因此使用 children 时 title 和 subTitle 将失效 | react node |  |
| iconName | 标题左侧显示的图标名称 | string |  |
| hasRightArrow | 是否显示右边的箭头 | boolean | true |
| extra | 显示在右边的内容 | react node |  |
| wrap | 内容过多时是否折行显示,折行的话将进行截断并显示... | boolean | true |
| slip | 是否提供左滑显示'删除'功能 | boolean | false |
| highlight | 点击时是否有高亮背景 | boolean | true |
| onClick | 点击回调 | function(e){} |  |
| onSlipItemClick | slip 为 true 时，点击删除的回调 | function(e){} |  |

