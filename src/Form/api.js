import React, { Component } from 'react';

export function create(Comp) {
  class WrappedComp extends Comp {
    setFieldsValue = () => {}
    getFieldsValue = (fields = []) => {
    }
    getFieldsError = () => {}
    resetFields = () => {}
    validateFields = () => {}
    render() {
      const form = {
        // decorator: decorator
        setFieldsValue: this.setFieldsValue,
        getFieldsValue: this.getFieldsValue,
        validateFields: this.validateFields,
        resetFields: this.resetFields,
        getFieldsError: this.getFieldsError,
      };
      return <Comp {...this.props} form={form} />;
    }
  }
  return WrappedComp;
}

export default {
  create,
};
