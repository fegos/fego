---
title: Radio
subTitle: 单选框
---

# 单选框 Radio

### 组件描述
- 同于向用户提供单选选择。

### 示例代码

```html
<Radio defaultChecked>默认选中的单选框</Radio>

<Radio.Group name="rbox">
  <Radio value="chi">语文</Radio>
  <Radio value="mat">数学</Radio>
  <Radio value="eng">英语</Radio>
  <Radio value="phy">物理</Radio>
  <Radio value="che">化学</Radio>
  <Radio value="bio">生物</Radio>
</Radio.Group>
```

## API

### Radio props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| label | 单选框文案 | string |  |
| children | 单选框文案，使用时label属性失效 | react node |  |
| checked | 是否选中，受控属性 | boolean |  |
| defaultChecked | 是否选中，非受控属性 | boolean |  |
| disabled | 是否禁用 | boolean | false |
| onChange | 变化回调 | function(e){} |  |


### Radio.Group props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| name | Group 下所有 input[type="Radio"] 的 name 属性 | string |  |
| value | 当前选中的单选框的值，受控属性 | string |  |
| defaultValue | 当前选中的单选框的值，非受控属性 | string |  |
| onChange | 变化回调 | function(e){} |  |
| options | 以配置形式设置子元素 | object array |  |
