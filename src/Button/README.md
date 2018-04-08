---
title: Button
subTitle: 按钮
---

# 按钮 Button

### 组件描述
- 标记了一个操作命令，响应用户点击行为，触发相应的业务逻辑。

### 示例代码

```html
<Button>default Button</Button>
<Button type="primary">primary Button</Button>
<Button type="ghost">ghost Button</Button>
```

## API

### props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| className | 样式类名，可用于覆盖默认样式 | string |  |
| type | 按钮类型，可选 'default', 'primary', 'danger', 'ghost' | string | 'default' |
| shape | 按钮形状，可选 'default', 'circle' | string | 'default' |
| size | 按钮尺寸，可选 'small', 'default', 'large' | string | 'default' |
| disabled | 按钮禁止状态 | boolean | false |
| htmlType | button 原生的 type 值，可选值请参考 HTML 标准，可选 'submit', 'button', 'reset' | string | button |
| loading | 按钮是否处于加载中状态，此时按钮不可点击，可使用拥有delay属性的对象，在一定的延迟后显示loading状态 | boolean or object | false |
| icon | 按钮图标 | boolean | false |
| dashed | 虚线边框 | boolean | false |
| onClick | 点击回调 | function(e) {} |  |
