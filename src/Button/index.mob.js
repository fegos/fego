import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { defaultProps, propTypes } from './PropsType';
import insertSpace from './util';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      loading: props.loading,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (typeof loading === 'boolean' && this.props.oading !== loading) {
      this.setState({ loading });
    }
  }
  handleTouchStart = () => {
    if (this.props.disabled) return;
    if (this.state.clicked) return;
    this.setState({ clicked: true });
  }
  handleTouchEnd = (e) => {
    this.setState({ clicked: false });
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  }
  render() {
    const {
      type, shape, size = '', className, htmlType, children, icon, prefixCls, disabled, dashed, style,
    } = this.props;
    const { loading, clicked } = this.state;
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-dashed`]: dashed,
      [`${prefixCls}-icon-only`]: !children && icon && !loading,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-clicked`]: clicked,
    });
    const iconName = loading ? 'loading' : icon;
    const iconEl = iconName ? <Icon name={iconName} /> : null;
    const needInserted = React.Children.count(children) === 1 && (!iconName || iconName === 'loading');
    const kids = React.Children.map(children, child => insertSpace(child, needInserted));
    return (
      <button
        type={htmlType}
        className={classes}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        disabled={disabled}
        style={style}
      >
        {iconEl}{kids}
      </button>);
  }
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;
