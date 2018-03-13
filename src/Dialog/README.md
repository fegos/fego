# 模态框 Modal

### 组件描述
- 以模态的方式与用于进行交互
- 提供以 React 元素的的方式(<Modal />)使用组件，以及使用 api 的方式使用组件

### 示例代码

```html
<Dialog
  title="标题"
  visible={true}
  onOk={() => {}}
  onCancel={() => {}}
>
  <p>内容内容内容内容</p>
  <p>内容内容内容内容</p>
</Dialog>
```

```js
// api 方式打开模态框
Dialog.success({
  title: '成功 yeah ~',
  content: '恭喜恭喜，成功',
  onOk: () => { console.log('success, ok'); },
});
```

## API

### props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| title | 模态框标题 | react node |  |
| footer | 模态框底部内容 | react node |  |
| width | 模态框宽度 | number or string | web 默认 520 |
| visible | 模态框是否可见 | boolean | false |
| okText | 确认按钮文案 | react node | '确定' |
| cancelText | 取消按钮文案 | react node | '取消' |
| onOk | 确认按钮回调 | function(e){} |  |
| onCancel | 取消按钮回调 | function(e){} |  |
| confirmLoading | 点击确认按钮时按钮是否出现loading状态 | boolean | false |
| closable | 是否显示右上角的关闭按钮 | boolean | web 默认 true, 移动端默认 false |
| maskClosable | 是否能通过点击背景关闭模态框 | boolean | true |
| transitionName | 模态框出现动画 | string | 'zoom' |
| maskTransitionName | 模态框背景出现动画 | string | 'fade' |


## Modal.method()

提供以下五种方式：
- confirm
- info
- warning
- success
- error

以上函数均接受一个对象类型参数，支持的属性与上表 Modal 接受的 props 相同，只不过 info, warning, success, error 默认
只有一个模态框按钮，此时即使设置 'cancelText'、'onCancel' 等属性也无效。
