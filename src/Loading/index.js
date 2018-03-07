import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';

export default class Loading extends React.Component {
  static defaultProps = {
    // 前缀
    prefixCls: 'ns-loading',
    // 时间延迟
    delay: 0,
    // 文案
    type: 'bar',
    // icon 大小
    tip: '',
    // icon 大小
    size: 'default',
  }
  static propTypes = {
    // 前缀
    prefixCls: PropTypes.oneOf(['ns-loading']),
    // 时间延迟
    delay: PropTypes.number,
    // 文案
    tip: PropTypes.string,
    // 默认的icon类型
    type: PropTypes.oneOf(['bar', 'circle']),
    // icon 大小
    size: PropTypes.oneOf(['default', 'small', 'large']),
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
    };
    this.timer = null;
  }
  componentWillReceiveProps(nextProps) {
    const { loading, delay } = nextProps;
    if (loading !== this.props.loading) {
      if (loading) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        setTimeout(() => {
          // 启动loading，根据设置的延迟时间来启动
          this.setState({
            loading: true,
          });
          clearTimeout(this.timer);
        }, delay);
      } else {
        // 取消loading，直接取消，不设置延迟
        this.setState({
          loading: false,
        });
      }
    }
  }
  renderBody() {
    const {
      type, size, tip, prefixCls,
    } = this.props;

    let tipEl = null;
    if (tip) {
      tipEl = <span>{tip}</span>;
    }
    let iconEl = null;
    const cls = classNames(`${prefixCls}-icon`, {
      [`${prefixCls}-icon-sm`]: size === 'small',
      [`${prefixCls}-icon-lg`]: size === 'large',
    });
    if (type === 'bar') {
      iconEl = (
        <div className={cls} >
          <span className="bar" />
          <span className="bar bar-2" />
          <span className="bar bar-3" />
        </div>
      );
    } else if (type === 'circle') {
      iconEl = (
        <div className={cls} >
          <Icon name="loading" className="circle" />
        </div>
      );
    }
    return (
      <div className={`${prefixCls}-ctn`}>
        {iconEl}
        {tipEl}
      </div>
    );
  }
  render() {
    const { children, prefixCls } = this.props;
    const { loading } = this.state;
    return (
      <div className={`${prefixCls}`}>
        {loading ? this.renderBody() : null}
        <div className={classNames({
          [`${prefixCls}-container`]: true,
          'is-loading': loading,
          'f-cb': true,
        })}
        >
          {children}
        </div>
      </div>
    );
  }
}
