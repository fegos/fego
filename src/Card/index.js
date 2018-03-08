import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  static defaultProps = {
    prefixCls: 'ns-card',
    // 卡片标题
    title: '',
    // 是否有边框
    border: true,
    // 鼠标移过时是否浮起
    hoverable: true,
    // 封面图
    cover: '',
    // 底部
    footer: null,
  }
  static propTypes = {
    prefixCls: PropTypes.oneOf(['ns-card']),
    // 卡片标题
    title: PropTypes.node,
    // 是否有边框
    border: PropTypes.bool,
    // 鼠标移过时是否浮起
    hoverable: PropTypes.bool,
    // 封面图
    cover: PropTypes.node,
    // 底部，接收数组、字符串、节点三种类型
    footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.string, PropTypes.node]),
  }
  state = {}
  renderHeader() {
    const { prefixCls, title } = this.props;
    return (
      <div className={classNames(`${prefixCls}-header`)}>
        <div className={classNames(`${prefixCls}-title`)}>
          {title}
        </div>
      </div>
    );
  }
  renderCover() {
    const { prefixCls, cover, title } = this.props;
    let imgEl = null;
    if (typeof cover === 'string') {
      imgEl = <img src={cover} alt="" />;
    } else if (React.isValidElement(cover)) {
      imgEl = cover;
    }
    return (
      <div className={classNames(`${prefixCls}-cover`, {
        [`${prefixCls}-cover-no-radius`]: title,
      })}
      >
        {imgEl}
      </div>
    );
  }
  renderBody() {
    const { prefixCls, children } = this.props;
    return (
      <div className={classNames(`${prefixCls}-body`)}>
        {children}
      </div>
    );
  }
  renderFooter() {
    const { prefixCls, footer } = this.props;
    let footEl = null;
    if (footer instanceof Array) {
      footEl = (
        <ul>
          {
            footer.map((item, i) => <li key={item.id || item.key || i}>{item}</li>)
          }
        </ul>
      );
    } else if (typeof footer === 'string') {
      footEl = (
        <div className={classNames(`${prefixCls}-footer-txt`)}>{footer}</div>
      );
    } else if (React.isValidElement(footer)) {
      footEl = footer;
    }
    return (
      <div className={classNames(`${prefixCls}-footer`)}>
        {footEl}
      </div>
    );
  }
  render() {
    const {
      prefixCls, children, className, style, title, cover, border, hoverable, footer,
    } = this.props;

    return (
      <div
        className={classNames(prefixCls, className, {
          [`${prefixCls}-border`]: border,
          [`${prefixCls}-hoverable`]: hoverable,
        })}
        style={style}
      >
        {title ? this.renderHeader() : null}
        {cover ? this.renderCover() : null}
        {children ? this.renderBody() : null}
        {footer ? this.renderFooter() : null}
      </div>
    );
  }
}
