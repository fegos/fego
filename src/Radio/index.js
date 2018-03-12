import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RadioGroup from './Group';

export default class Radio extends Component {
  static defaultProps = {
    // 前缀
    prefixCls: 'ns-radio',
  }

  static propTypes = {
    // 前缀
    prefixCls: PropTypes.oneOf(['ns-radio']),
    // radio label 文案
    label: PropTypes.string,
    // radio label 文案，使用则 labe 属性失效
    children: PropTypes.node,
    // 受控属性，当前是否选中，需配合 onChane 使用
    checked: PropTypes.bool,
    // 回调
    onChange: PropTypes.func,
    // 非受控属性，当前是否选中
    defaultChecked: PropTypes.bool,
    // 是否禁用
    disabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      checked: 'checked' in props ? props.checked : props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps && nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  onChange = (e) => {
    const { onChange, disabled } = this.props;
    const { checked } = e.nativeEvent.target;

    if (disabled) return;

    if (!('checked' in this.props)) {
      this.setState({
        checked,
      });
    }

    onChange instanceof Function && onChange(e.nativeEvent);
  }

  renderLabel() {
    const { prefixCls, label, children } = this.props;

    if (children) {
      return <span className={`${prefixCls}-label`}>{children}</span>;
    } else if (label) {
      return <span className={`${prefixCls}-label`}>{label}</span>;
    }
    return null;
  }

  render() {
    const {
      prefixCls, className, style, children, disabled, ...otherProps
    } = this.props;

    return (
      <label
        htmlFor={otherProps.id}
        className={classNames(`${prefixCls}-wrapper`, className)}
        style={style}
      >
        <span className={classNames(`${prefixCls}`, {
          [`${prefixCls}-checked`]: this.state.checked,
          [`${prefixCls}-disabled`]: disabled,
        })}
        >
          <input
            type="radio"
            ref={(i) => { this.radioRef = i; }}
            {...otherProps}
            disabled={disabled}
            className={`${prefixCls}-ipt`}
            onChange={this.onChange}
          />
          <span className={`${prefixCls}-inner`}>
            <span className={`${prefixCls}-inner-circle`} />
          </span>
        </span>
        {this.renderLabel()}
      </label>
    );
  }
}

Radio.Group = RadioGroup;
