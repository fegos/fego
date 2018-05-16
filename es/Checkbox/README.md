---
title: Checkbox
subTitle: 复选框
---

# 复选框 Checkbox

### 组件描述
- 同于向用户提供多选选择。

### 示例代码

```html
<Checkbox defaultChecked>默认选中的复选框</Checkbox>

<Checkbox.Group name="cbox">
  <Checkbox value="chi">语文</Checkbox>
  <Checkbox value="mat">数学</Checkbox>
  <Checkbox value="eng">英语</Checkbox>
  <Checkbox value="phy">物理</Checkbox>
  <Checkbox value="che">化学</Checkbox>
  <Checkbox value="bio">生物</Checkbox>
</Checkbox.Group>
```

## API

### Checkbox props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| label | 复选框文案 | string |  |
| children | 复选框文案，使用时label属性失效 | react node |  |
| checked | 是否选中，受控属性 | boolean |  |
| defaultChecked | 是否选中，非受控属性 | boolean |  |
| disabled | 是否禁用 | boolean | false |
| onChange | 变化回调 | function(e){} |  |
| indeterminate | 设置 indeterminate 状态，负责样式控制 | boolean | false |


### Checkbox.Group props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| name | Group 下所有 input[type="checkbox"] 的 name 属性 | string |  |
| value | 当前选中的复选框的值，受控属性 | array |  |
| defaultValue | 当前选中的复选框的值，非受控属性 | array | [] |
| onChange | 变化回调 | function(e){} |  |
| options | 以配置形式设置子元素 | object array |  |
