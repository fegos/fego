# 图标 Icon

### 组件描述
- 常用图标集合

### 示例代码

```html
<Icon name="success" />
<Icon name="error" color="red" size={38} />
```

### 说明
- 所有图标均托管在 [iconfont](http://iconfont.cn/)
- 更新图标库时需将文件下载到本地，然后用 iconfont.js 文件里的内容替换 Icon 组件目录下 font.js 文件里的主内容
- 关于图标的更多用法参见 iconfont 的[官方说明](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d0091c141&helptype=code)

## API

### props列表

| 属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
| className | 样式类名，可用于覆盖默认样式 | string |  |
| name | 图标名 | string |  |
| spin | 图标是否旋转 | boolean | false |
| width | 图标宽 | number |  |
| height | 图标高 | number |  |
| size | 图标尺寸，使用时会导致 width 和 height 失效 | number |  |
| style | 单独指定图标样式 | style |  |
| color | 单独指定图标颜色 | string |  |
