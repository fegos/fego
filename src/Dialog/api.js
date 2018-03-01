import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Icon, Button } from 'fego';
import Dialog from './index';

class Agent extends Component {
  state = {
    visible: true,
  }
  onCancel = (e) => {
    const { onCancel } = this.props;
    if (onCancel instanceof Function) {
      onCancel(e);
    }
    this.close();
  }
  onOk = (e) => {
    const { onOk } = this.props;
    if (onOk instanceof Function) {
      onOk(e);
    }
    this.close();
  }
  close() {
    this.setState({
      visible: false,
    }, () => {
      // dialog 打开和关闭有一个动画执行的时间，因此在动画时间结束后，再移除 dom
      // 300 是经验值，估计动画消失的时间应该是在 rc-animate 里定义的，
      const timer = setTimeout(() => {
        clearTimeout(timer);
        const { mountNode } = this.props;
        const unmountResult = ReactDOM.unmountComponentAtNode(mountNode);
        if (unmountResult && mountNode.parentNode) {
          mountNode.parentNode.removeChild(mountNode);
        }
      }, 300);
    });
  }
  render() {
    const {
      prefixCls = 'ns-dialog', type, iconName, title, content, okText, cancelText, cancel,
    } = this.props;
    const footer = cancel ? ([
      <Button onClick={this.onCancel} key="cancel">{cancelText}</Button>,
      <Button onClick={this.onOk} key="ok" type="primary">{okText}</Button>,
    ]) : (<Button onClick={this.onOk} type="primary">{okText}</Button>);
    return (
      <Dialog
        className={`${prefixCls}-${type}`}
        visible={this.state.visible}
        width={420}
        closable={false}
        maskClosable={false}
        footer={null}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <div className={`${prefixCls}-${type}-wrapper`}>
          <div className={`${prefixCls}-${type}-title`}>
            <Icon name={iconName} />
            {title ? <span className="title">{title}</span> : null}
          </div>
          {content ? <div className={`${prefixCls}-${type}-content`}>{content}</div> : null}
        </div>
        <div className={`${prefixCls}-${type}-btns`}>{footer}</div>
      </Dialog>
    );
  }
}

function doRender(props) {
  const mountNode = document.createElement('div');
  document.body.appendChild(mountNode);
  render(<Agent {...props} mountNode={mountNode} />, mountNode);
}

function confirm(config) {
  const { okText = '确定', cancelText = '取消', ...rest } = config;
  const props = {
    ...rest,
    type: 'confirm',
    iconName: 'question-fill',
    cancel: true,
    okText,
    cancelText,
  };
  doRender(props);
}

function info(config) {
  const { okText = '知道了', ...rest } = config;
  const props = {
    ...rest,
    type: 'info',
    iconName: 'info',
    cancel: false,
    okText,
  };
  doRender(props);
}

function warning(config) {
  const { okText = '知道了', ...rest } = config;
  const props = {
    ...rest,
    type: 'warning',
    iconName: 'warning',
    cancel: false,
    okText,
  };
  doRender(props);
}

function error(config) {
  const { okText = '知道了', ...rest } = config;
  const props = {
    ...rest,
    type: 'error',
    iconName: 'error',
    cancel: false,
    okText,
  };
  doRender(props);
}

function success(config) {
  const { okText = '知道了', ...rest } = config;
  const props = {
    ...rest,
    type: 'success',
    iconName: 'success',
    cancel: false,
    okText,
  };
  doRender(props);
}

export {
  confirm,
  info,
  warning,
  error,
  success,
};
