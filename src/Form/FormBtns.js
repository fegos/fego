import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FormBtns extends Component {
  static defaultProps = {
    prefixCls: 'ns-form-btns',
    displayName: 'FormBtns',
  }
  static propTypes = {
    prefixCls: PropTypes.oneOf(['ns-form-btns']),
    displayName: PropTypes.oneOf(['FormBtns']),
    formLayout: PropTypes.string,
    itemLayout: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const {
      prefixCls, children, formLayout, itemLayout,
    } = this.props;
    return (
      <div className={classNames(`${prefixCls}-wrapper`, {
        [`${prefixCls}-left-with-offset`]: formLayout === 'vertical' && itemLayout === 'horizontal',
        [`${prefixCls}-right-hh`]: formLayout === 'horizontal' && itemLayout === 'horizontal',
        [`${prefixCls}-right-hv`]: formLayout === 'horizontal' && itemLayout === 'vertical',
      })}
      >
        <div className={classNames(`${prefixCls}`)}>
          {children}
        </div>
      </div>
    );
  }
}
