---
title: Table
subTitle: 表格
---

# 表格 Table

### 组件描述
- 用于展示行列数据
- 可以对数据进行排序、分页、等操作，以方便查看表格数据
- 本组件只适用于web端，移动端不建议使用Table展示数据

### 示例代码

```js
<Table columns={columns} dataSource={[]} />
<Table columns={columns2} dataSource={this.state.dataSource} loading={this.state.loading} tfootData={{
  name: 'asy',
  age: '20',
  sex: 'female',
  company: 'fego'
}} pagination={{
  total: 13,
  page: this.state.page,
  showTotal: (total, range) => `共${total}条数据，显示${range[0]}-${range[1]}条`
}} onChange={(pagination, sorter, filters) => {}} />
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| columns | 表格列的配置描述 | array[object] | [] |
| dataSource | 表格数据 | array[object] | [] |
| showHeader | 是否显示表头 | bool | true |
| tfootData | 表尾数据，可用于放一些合计类数据 | object |  |
| title | 头部标题 | function(){} |  |
| footer | 尾部标题 | function(){} |  |
| loading | 是否加载中 | bool | false |
| pagination | 分页器 | object/bool | false |
| rowKey | 表格行 key 的取值, 当是函数时，参数为 record, index | string/function(record, index){} |  |
| onChange | 分页、排序、筛选变化时触发 | function(pagination, sorter, filter){} |  |
| rowClassName | 表格行的类名 | string |  |
| rowSelection | 列表项是否可选择 | object | null |
| emptyText | 无数据时的提示文案 | string | 'Ops…暂无数据' |


### columns


### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| title | 列头显示文字 | string |  |
| key | React 需要的 key，设置了唯一的 dataIndex，可以忽略 | string |  |
| dataIndex | 列数据在数据项中对应的 key | string |  |
| render | 渲染函数 | function(text, record, index) {} |  |
| className | 列类 | string |  |
| sorter | 排序函数，本地排序:function(a, b){}，服务端排序:true |  |  |


### pagination

+ Pagination = false : 不显示分页条，展示全部数据
+ Pagination = true : 显示分页条，后台给全部数据，前端进行分页
+ Pagination = object : 显示分页条，由后端分页
  + 无 page 属性：使用非受控属性 defaultPage
  + 有 page 属性：使用受控属性 page, 需搭配 onChange 使用
  + pageSize 同理

### props列表
具体见 Pagination 组件

### rowSelection
### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| type | 多选/单选 | 'checkbox' or 'radio' | 'checkbox' |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | array | [] |
| onChange | 选中项发生变化的时的回调 | function(selectedRowKeys, selectedRows){} |  |
| onSelect | 选择/取消选择某列的回调 | function(selected, record, selectedRows){} |  |
| onSelectAll | 选择/取消选择所有列的回调 | function(selected, selectedRows, changedRows){} |  |
| getCheckboxProps | 选择框的默认属性配置 | function(record){} |  |
