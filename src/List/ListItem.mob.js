import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from 'fego';

export default class ListItem extends Component {
  static defaultProps = {
    // 前缀
    prefixCls: 'ns-list',
    // 是否显示右箭头
    hasRightArrow: true,
    // 点击回调
    onClick: () => { },
    // 垂直方向的对其方式
    verticalAlign: 'center',
    // 清单内容过多时是否折行显示, true - 折行显示 false - 不折行显示，超出部分显示省略号
    wrap: true,
    // 是否能左滑
    slip: false,
    // 高亮色
    highlight: true,
  }
  static propTypes = {
    // 前缀
    prefixCls: PropTypes.oneOf(['ns-list']),
    // 标题
    title: PropTypes.node,
    // 副标题
    subTitle: PropTypes.node,
    // 子元素集，若使用则其他的内容相关props, eg: title, subTitle 将失效
    children: PropTypes.node,
    // 右边内容
    extra: PropTypes.node,
    // 左侧图标的名称
    iconName: PropTypes.string,
    // 是否显示右箭头
    hasRightArrow: PropTypes.bool,
    // 点击回调
    onClick: PropTypes.func,
    // 垂直方向的对其方式
    verticalAlign: PropTypes.oneOf(['center', 'top', 'bottom']),
    // 清单内容过多时是否折行显示, true - 折行显示 false - 不折行显示，超出部分显示省略号
    wrap: PropTypes.bool,
    // 是否能左滑显示'删除'
    slip: PropTypes.bool,
    // 点击左滑显示'删除'的回调
    onSlipItemClick: PropTypes.func,
    // 高亮色
    highlight: PropTypes.bool,
    // 是否渲染成链接
    link: PropTypes.string,
  }
  touchEvent = {}
  width = 88 // 左滑有显示的内容的宽度
  constructor(props) {
    super(props);
    this.state = {
      clicked: false, // list item 是否被点击
      moving: false, // list item 是否处于 touchmove 事件中, slip 为 true 时生效
      left: 0, // slip 为 true 时 list item 的偏移量
      expand: false, // touchmove 事件的结果是'删除'是否显示出来了, slip 为 true 时生效
    };
  }
  onTouchStart = (e) => {
    if (this.state.clicked) return;
    const touchEvent = e.nativeEvent;
    const touch = touchEvent.changedTouches[0];
    this.touchEvent.pageX = touch.pageX;
    this.touchEvent.pageY = touch.pageY;
    this.touchEvent.screenX = touch.screenX;
    this.touchEvent.screenY = touch.screenY;
    this.setState({
      clicked: true,
    });
  }
  onTouchMove = (e) => {
    if (!this.props.slip) return;

    // 启动左滑功能的才处理 move 事件
    const touchEvent = e.nativeEvent;
    const touch = touchEvent.changedTouches[0];
    const diffScreenY = touch.screenY - this.touchEvent.screenY;
    if (Math.abs(diffScreenY) > touchEvent.target.offsetHeight) return;

    const diffScreenX = touch.screenX - this.touchEvent.screenX;
    let left = diffScreenX;

    if (diffScreenX > 0) { // ➡️右滑，直接设为 0
      left = 0;
    } else if (diffScreenX < 0 - this.width || this.state.expand) {
      // ⬅️左滑，但超过了宽度，或是已展开的情况下左滑，都维持最大宽度
      left = 0 - this.width;
    }

    this.setState({
      moving: true,
      left,
    });
  }
  onTouchEnd = (e) => {
    const touchEvent = e.nativeEvent;
    const touch = touchEvent.changedTouches[0];
    let _state = {
      moving: false,
      clicked: false,
    };
    const { moving, expand } = this.state;
    // 滑动中->滑动结束
    if (moving) {
      const diffScreenX = touch.screenX - this.touchEvent.screenX;
      const diffScreenY = touch.screenY - this.touchEvent.screenY;
      let left = diffScreenX;
      let expand2;
      if (Math.abs(diffScreenY) <= touchEvent.target.offsetHeight) {
        if (diffScreenX > 0) { // ➡️右滑
          left = 0;
          expand2 = false;
        } else { // ⬅️左滑
          if (left < 0 - this.width) {
            left = 0 - this.width;
          }

          if (Math.abs(left) >= this.width / 2) { // 滑动超过宽度的一半就展开
            left = 0 - this.width;
            expand2 = true;
          } else { // 未超过宽度的一半不展开
            left = 0;
            expand2 = false;
          }
        }
      } else {
        left = 0;
        expand2 = false;
      }

      _state = {
        ..._state,
        expand: expand2,
        left,
      };
    } else if (expand) { // 点击，但是已展开的时候，关闭展开
      _state = {
        ..._state,
        left: 0,
        expand: false,
      };
    } else { // 未启动左滑,则处理点击事件
      const diffPageX = touch.pageX - this.touchEvent.pageX;
      const diffPageY = touch.pageY - this.touchEvent.pageY;
      const { onClick } = this.props;
      // 点击回调的要求：触摸开始和结束时同一个点
      if ((onClick instanceof Function) && diffPageX === 0 && diffPageY === 0) {
        onClick instanceof Function && onClick(e);
      }
    }

    this.setState(_state);
  }
  onTouchCancel = () => {
    this.setState({
      clicked: false,
      moving: false,
      left: 0,
    });
  }
  handleSlipTouchEnd = () => {
    const { onSlipItemClick } = this.props;

    onSlipItemClick instanceof Function && onSlipItemClick();

    this.setState({
      moving: false,
      expand: false,
      left: 0,
    });
  }
  render() {
    const {
      prefixCls, title, subTitle, wrap, hasRightArrow, extra, verticalAlign, iconName, slip, children, className, highlight, link, style,
    } = this.props;
    // 处理有左滑时候的样式
    const finalStyle = {};
    if (slip) {
      finalStyle.left = `${this.state.left}px`;
    }
    const TagName = link ? Link : 'div';
    const extraProps = link ? { to: link } : {};
    return (
      <TagName
        className={classNames(`${prefixCls}-item`, className, {
          [`${prefixCls}-item-align-top`]: verticalAlign === 'top',
          [`${prefixCls}-item-align-bottom`]: verticalAlign === 'bottom',
          [`${prefixCls}-item-clicked`]: highlight && this.state.clicked,
          [`${prefixCls}-item-slip`]: slip,
        })}
        style={style}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        onTouchCancel={this.onTouchCancel}
        onTouchMove={this.onTouchMove}
        {...extraProps}
      >
        <div className={`${prefixCls}-item-inner`} style={finalStyle}>
          {iconName ? <div className={`${prefixCls}-icon`}><Icon name={iconName} /></div> : null}
          {/* 有 children 则 title, subTitle 失效，直接 render children */}
          {children ? (
            <div className={classNames(`${prefixCls}-title`, {
              [`${prefixCls}-title-nowrap`]: !wrap,
            })}
            >
              {children}
            </div>
          ) : (
            <div className={classNames(`${prefixCls}-title`, {
              [`${prefixCls}-title-nowrap`]: !wrap,
            })}
            >
              {title}
              {subTitle ? <div className={`${prefixCls}-sub-title`}>{subTitle}</div> : null}
            </div>
          )}
          {(extra !== undefined) ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
          {hasRightArrow ? <div className={`${prefixCls}-arrow`}><Icon name="right-arrow" /></div> : null}
        </div>
        {slip ? <div className={`${prefixCls}-item-del`} style={{ width: `${this.width}px` }} onTouchEnd={this.handleSlipTouchEnd}>删 除</div> : null}
      </TagName>
    );
  }
}
