---
title: Input
subTitle: 输入框
---

# Input

### 组件描述
- 单行文本输入框

### 示例代码

```js
<Input size='large'/>
<Input prefix={<Icon name="plus" style={{ fontSize: '12px', color: '#999'}} />}
	onPressEnter={(e)=>{console.log(e)}}
	value={this.state.value}
	onChange={(value)=>{this.setState({value})}}
/>
```

## API

### props列表
**其他属性同浏览器的input, eg：placeholder, name, id**

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| size | 大小 | ['default', 'large', 'small'] | 'default' |
| showClear | 是否显示清除按钮 | bool | false |
| defaultValue | 非受控属性,输入框内容 | string |  |
| value | 受控属性,输入框内容,需配合onChange使用 | string |  |
| disabled | 禁用 | bool | false |
| onPressEnter | 回车回调 | function(e) {} |  |
| onKeyDown | 按键按下回调 | function(e) {} |  |
| onChange | 输入框值发生变化回调 | function(value) {} |  |
| prefix | 前缀图标 | string/node |  |
| suffix | 后缀图标 | string/node |  |

### TextAre

### 组件描述
- 多行文本输入框, 作为Input的子组件使用 `<Input.TextArea />`

### 示例代码

```js
<Input.TextArea
	autoSize={{
		maxRows: 6,
		minRows: 2
	}}
	defaultValue='defaultValue'
	placeholder='placeholder'
	resize={false}/>

<Input.TextArea
	autoSize={true}
	value={this.state.value}
	placeholder='placeholder'
	onChange={(value) => { this.setState({ value }) }}/>
```

## API

### props列表
**其他属性同浏览器的textarea, eg：rows, name, id**

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| defaultValue | 非受控属性,输入框内容 | string |  |
| value | 受控属性,输入框内容,需配合onChange使用 | string |  |
| disabled | 禁用 | bool | false |
| onPressEnter | 回车回调 | function(e) {} |  |
| onKeyDown | 按键按下回调 | function(e) {} |  |
| onChange | 输入框值发生变化回调 | function(value) {} |  |
| autoSize | 自适应内容高度 | bool/object | false |
| resize | 是否能拖动改变输入框大小 | string | true |

### autoSize 说明
- false : 输入框大小不变
- true : 输入框高度会自适应内容的高度
- object - {minRows, maxRows} : 在 minRows，maxRows 范围内自适应输入高度
