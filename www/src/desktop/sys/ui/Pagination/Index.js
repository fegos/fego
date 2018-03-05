import React, { Component } from 'react';
import { Pagination, Button } from 'fego';
import style from './index.less';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 9,
      total: 13,
    };
  }
  render() {
    return (
      <div className={style.page}>
        <div className="section">
          <h3>基本分页器: </h3>
          <Pagination total={248} />
        </div>
        <div className="section">
          <h3>展示总条数、跳转、分页大小: </h3>
          <Pagination showTotal showJumper pageSize={20} total={248} defaultPage={1} />
        </div>
        <div className="section">
          <h3>当前页使用非受控属性 defaultPage: </h3>
          <Pagination showTotal showJumper showPageSizeChanger total={248} defaultPage={4} />
        </div>
        <div className="section">
          <h3>当前页使用受控属性 page: </h3>
          <Pagination
            showTotal
            showJumper
            showPageSizeChanger
            total={248}
            page={this.state.page}
            onChange={(curPage, curPageSize) => {
              this.setState({
                page: curPage,
              });
            }}
          />
        </div>
        <div className="section">
          <h3>定制总条数的展示: </h3>
          <Pagination
            showJumper
            showPageSizeChanger
            total={248}
            showTotal={(total, range, curPage, curPageSize) => {
              return `总共${total}条数据，当前显示${range[0]}-${range[1]}条数据`;
            }}
          />
        </div>
        <div className="section size">
          <h3>分页器尺寸: </h3>
          <Pagination showTotal showJumper total={248} size="small" />
          <Pagination showTotal showJumper total={248} />
          <Pagination showTotal showJumper total={248} size="large" />
        </div>
        <div className="section">
          <h3>总条数 total 的改变: </h3>
          <Button
            onClick={() => {
              this.setState({
                total: this.state.total + 10,
              });
            }}
            style={{ marginBottom: '5px' }}
          >
            点击改变总条数
          </Button>
          <Pagination total={this.state.total} />
        </div>
      </div>
    );
  }
}
