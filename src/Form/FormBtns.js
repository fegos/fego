import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FormBtns extends Component {
  static displayName = 'FormBtns'
  static defaultProps = {
    // 前缀
    prefixCls: 'ns-form-btns',
    // form的布局方式
    formLayout: 'vertical',
    // 表单项的布局方式，当为vertical时，按钮应该距控件而非label在同一水平线
    itemLayout: 'vertical',
  }
  static propTypes = {
    // 前缀
    prefixCls: PropTypes.oneOf(['ns-form-btns']),
    // form的布局方式
    formLayout: PropTypes.oneOf(['vertical', 'horizontal', 'horizontal-inline']),
    // 表单项的布局方式，当为vertical时，按钮应该距控件而非label在同一水平线
    itemLayout: PropTypes.oneOf(['vertical', 'horizontal']),
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
        // 表单垂直布局，label&控件水平，因此容器有左侧偏移量，使按钮容器与控件对齐
        [`${prefixCls}-left-offset`]: formLayout === 'vertical' && itemLayout === 'horizontal',
        // 表单水平布局按钮居右
        [`${prefixCls}-right`]: formLayout === 'horizontal',
        // label&控件垂直布局，因此容器上方有偏移量，使按钮容器与控件对齐
        [`${prefixCls}-top-offset`]: itemLayout === 'vertical',
        // 表单水平布局按钮居右，label&控件水平布局，为按钮容器float了会出现与表单项有2px左右的偏差，使用 ns-form-btns-top-correct 进行修正
        [`${prefixCls}-top-correct`]: formLayout === 'horizontal' && itemLayout === 'horizontal',
      })}
      >
        <div className={classNames(`${prefixCls}`)}>
          {children}
        </div>
      </div>
    );
  }
}
