import React from 'react';
import BaseDialog from './BaseDialog';
import Button from '../Button';
import { defaultProps, propTypes } from './PropsType';
import { confirm, info, warning, error, success } from './api';

export default class Dialog extends React.Component {
  static confirm = confirm;
  static info = info;
  static warning = warning;
  static error = error;
  static success = success;
  constructor(props) {
    super(props);
    this.handleCancel = (e) => {
      const { onCancel } = this.props;
      if (onCancel) {
        onCancel(e);
      }
    };
    this.handleOk = (e) => {
      const { onOk } = this.props;
      if (onOk) {
        onOk(e);
      }
    };
  }
  render() {
    const {
      prefixCls, okText, cancelText, confirmLoading, footer, visible, ...rest
    } = this.props;
    const dialogFooter = footer === undefined ? [(
      <Button key="cancel" onClick={this.handleCancel}>
        {cancelText}
      </Button>), (
      <Button key="confirm" type="primary" loading={confirmLoading} onClick={this.handleOk}>
        {okText}
      </Button>)] : footer;

    return (
      <BaseDialog
        {...rest}
        onClose={this.handleCancel}
        footer={dialogFooter}
        visible={visible}
      />);
  }
}

Dialog.defaultProps = {
  ...defaultProps,
  closable: false,
};
Dialog.propTypes = propTypes;
