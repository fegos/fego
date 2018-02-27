import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from './index';

export default class CheckboxGroup extends Component {
  static defaultProps = {
    // 前缀
    prefixCls: 'ns-checkbox-group',
    // 非受控属性，默认选中的值
    defaultValue: [],
  }

  static propTypes = {
    // checkboxGroup 下所有 input[type="checkbox"] 的 name 属性
    name: PropTypes.string.isRequired,
    // 受控属性，当前选中的值
    value: PropTypes.array,
    // 非受控属性，默认选中的值
    defaultValue: PropTypes.array,
    // 选项变化时的回调函数
    onChange: PropTypes.func,
    // 子元素
    children: PropTypes.node,
    // 以配置形式设置子元素
    options: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props);

    this.state = {
      valueArr: 'value' in props ? props.value : props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value.toString() !== this.props.value.toString()) {
      this.setState({
        valueArr: nextProps.value,
      });
    }
  }

  updateValueArr(value, checked) {
    const { valueArr } = this.state;

    if (checked) {
      valueArr.push(value);
    } else {
      const index = valueArr.indexOf(value);
      valueArr.splice(index, 1);
    }

    return valueArr;
  }

  onChange = (e) => {
    const { value, checked } = e.target;
    const { onChange } = this.props;
    const valueArr = this.updateValueArr(value, checked);

    if (!('value' in this.props)) {
      this.setState({
        valueArr,
      });
    }
    onChange instanceof Function && onChange(valueArr);
  }

  render() {
    const {
      prefixCls, className, style, name, children, options,
    } = this.props;
    return (
      <div className={classNames(`${prefixCls}`, className)} style={style}>{
        children ? (
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              name,
              checked: this.state.valueArr.indexOf(child.props.value) >= 0,
              onChange: this.onChange,
            });
          })
        ) : (
            options.map((opt) => {
              return (
                <Checkbox
                  key={opt.value}
                  value={opt.value}
                  name={name}
                  checked={this.state.valueArr.indexOf(opt.value) >= 0}
                  onChange={this.onChange}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </Checkbox>
              );
            })
          )
      }
      </div>
    );
  }
}
