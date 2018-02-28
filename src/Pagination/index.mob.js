import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Icon } from 'fego';

export default class Pagination extends Component {
  static defaultProps = {
    // 前缀
    prefixCls: 'ns-pagination',
    // 页码改变的回调，参数为改变后的页码以及每页条数
    onChange: (curPage, curPageSize) => { },
    // 非受控属性，当前页数
    defaultPage: 1,
    // 数据总数
    total: 0,
    // 组件尺寸
    size: 'default',
    // 默认的每页条数
    defaultPageSize: 10,
    // 上一页文案
    prevText: '上一页',
    // 下一页文案
    nextText: '下一页',
  }
  static propTypes = {
    // 前缀
    prefixCls: PropTypes.oneOf(['ns-pagination']),
    // 页码改变的回调，参数为改变后的页码以及每页条数
    onChange: PropTypes.func,
    // 受控属性，当前页数，需搭配 onChange 使用
    page: PropTypes.number,
    // 非受控属性，当前页数
    defaultPage: PropTypes.number,
    // 数据总数
    total: PropTypes.number,
    // 组件尺寸
    size: PropTypes.oneOf(['small', 'default', 'large']),
    // 非受控属性，默认的每页条数
    defaultPageSize: PropTypes.number,
    // 上一页文案
    prevText: PropTypes.node,
    // 下一页文案
    nextText: PropTypes.node,
  }

  constructor(props) {
    super(props);

    const {
      page, defaultPage, defaultPageSize, total,
    } = props;
    let curPage = page === undefined ? defaultPage : page;
    const curPageSize = defaultPageSize;
    const totalPage = Math.ceil(total / curPageSize);

    (curPage <= 0) && (curPage = 1);
    (curPage > totalPage) && (curPage = totalPage);

    this.state = {
      totalPage,
      curPage,
      curPageSize,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { page, total } = nextProps;
    const _state = {};

    if (page !== undefined && page !== this.props.page) {
      _state.curPage = page;
    }

    if (total !== this.props.total) {
      _state.totalPage = Math.ceil(total / this.state.curPageSize);
    }

    this.setState(_state);
  }

  onPageChange(curPage) {
    if (curPage === this.state.curPage) return; // 页码没变的话不触发onChange
    this.props.page === undefined && this.setState({
      curPage,
    });
    this.props.onChange(curPage, this.state.curPageSize);
  }

  onPrev(step) {
    const { curPage } = this.state;

    if (curPage - step < 1) return;

    this.onPageChange(curPage - step);
  }

  onPrevOneClick = () => {
    this.onPrev(1);
  }

  onNext(step) {
    const { curPage, totalPage } = this.state;

    if (curPage + step > totalPage) return;

    this.onPageChange(curPage + step);
  }

  onNextOneClick = () => {
    this.onNext(1);
  }

  render() {
    const {
      prefixCls, className, style, size, total, prevText, nextText,
    } = this.props;
    const { curPage, totalPage } = this.state;
    const prevBtnDisabled = totalPage === 0 || curPage === 1;
    const nextBtnDisabled = totalPage === 0 || curPage === totalPage;

    if (total < 0) return null;

    return (
      <div
        unselectable="unselectable"
        className={classNames(prefixCls, className, {
          [`${prefixCls}-sm`]: size === 'small',
          [`${prefixCls}-lg`]: size === 'large',
        })}
        style={style}
      >
        <div className={`${prefixCls}-prev`}>
          <Button onClick={this.onPrevOneClick} size={size} disabled={prevBtnDisabled}>
            <Icon name="back" /> {prevText}
          </Button>
        </div>
        <div className={`${prefixCls}-item`}>
          <span className={`${prefixCls}-item-active`}>{curPage}</span> / {totalPage}
        </div>
        <div className={`${prefixCls}-next`}>
          <Button onClick={this.onNextOneClick} size={size} disabled={nextBtnDisabled}>
            {nextText} <Icon name="right-arrow" />
          </Button>
        </div>
      </div>
    );
  }
}
