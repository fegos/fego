# 分页 Pagination

### 组件描述
- 以分页的形式展示长列表数据，每次加载部分数据，以提高效率

### 示例代码

```js
<Pagination showJumper total={248} size='small' />
<Pagination showTotal showJumper total={248} size='large' />
<Pagination showTotal showJumper showPageSizeChanger total={248} defaultPage={4} />
<Pagination showTotal showJumper pageSize={20}       total={248} defaultPage={1} />
<Pagination showJumper showPageSizeChanger total={248}
  showTotal={(total, range, curPage, curPageSize)=>{
    return `总共${total}条数据，当前显示${range[0]}-${range[1]}条数据`
  }}
  page={this.state.page}
  onChange={(curPage, curPageSize)=>{
    this.setState({
      page: curPage
    })
  }}/>
```

## API

### props列表

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| onChange | 页码改变的回调，参数为改变后的页码以及每页条数 | function(curPage, curPageSize){} |  |
| page | 受控属性，当前页数，需搭配 onChange 使用 | number |  |
| defaultPage | 非受控属性，当前页数 | number | 1 |
| total | 数据总数 | number | 0 |
| size | 组件尺寸 | ['small', 'default', 'large'] | 'default' |
| showTotal | 是否显示总数和当前数据顺序，参数为数据总数以及当前显示的数据范围 | bool为false时不显示，为true时显示'总共${total}条数据'/functin(total, range, curPage, curPageSize){} | false |
| showJumper | 是否显示快速跳转至某页 | bool | false |
| jumperText | 快速跳转至某页的文案 | string | '跳转至' |
| defaultPageSize | 非受控属性，默认的每页条数 | number | 10 |
| pageSize | 受控属性，每页条数, 需搭配 onPageSizeChange 使用 | number |  |
| showPageSizeChanger | 是否显示可以改变 PageSize 的下拉框 | bool | false |
| pageSizeOptions | PageSize 的下拉框的选项值 | array[number]/array[string] | [10, 30, 50] |
| pageSizeOptionFormat | PageSize 的下拉框显示的格式 | string | '${pageSize}条/页' |
| onPageSizeChange | PageSize 变化的回调 | function(curPage, curPageSize){} |  |

