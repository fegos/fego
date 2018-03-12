# 下拉框 Select

### 组件描述
- 弹出一个下拉菜单为用户提供选择操作


### 示例代码

```html
<Select showClear defaultValue="eng">
  <Select.Option value="chi">语文</Select.Option>
  <Select.Option value="mat">数学</Select.Option>
  <Select.Option value="eng">英语</Select.Option>
  <Select.Option value="phy">物理</Select.Option>
  <Select.Option value="che">化学</Select.Option>
  <Select.Option value="bio">生物</Select.Option>
</Select>
```

## API

### Select props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|

| value | 当前选中的项的值，受控属性 | string |  |
| defaultValue | 当前选中的项的值，非受控属性 | string |  |
| size | 下拉框大小，可选：'default', 'large', 'small' | string | default|
| showClear | 是否禁用 | boolean | false |
| disabled | 是否显示清楚按钮 | boolean | false |
| onChange | 变化回调 | function(e){} |  |
| onFocus | 获得焦点时回调 | function(e){} |  |
| onBlur | 失去焦点时回调 | function(e){} |  |
| dropdownClassName | 下拉菜单的 className 属性 | string |  |



### Select.Option props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| value | 下拉选项的值 | string |  |
| disabled | 该下拉选项是否被禁用 | boolean | false |
