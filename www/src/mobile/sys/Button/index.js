import React, { Component } from 'react';
import { Button } from 'fego';

export default class Page extends Component {
  state = {}
  render() {
    return (
      <div>
        <Button type="default" style={{ marginBottom: '20px' }}>default Button</Button>
        <Button disabled style={{ marginBottom: '20px' }}>disabled default Button</Button>
        <Button loading style={{ marginBottom: '20px' }}>loading Button</Button>
        <Button type="primary" style={{ marginBottom: '20px' }}>primary Button</Button>
        <Button type="primary" disabled style={{ marginBottom: '20px' }}>disabled primary Button</Button>
        <Button type="danger" style={{ marginBottom: '20px' }}>danger Button</Button>
        <Button type="danger" disabled style={{ marginBottom: '20px' }}>disabled danger Button</Button>
        <Button type="ghost" style={{ marginBottom: '20px' }}>ghost Button</Button>
        <Button type="ghost" disabled style={{ marginBottom: '20px' }}>disabled ghost Button</Button>
        <Button dashed style={{ marginBottom: '20px' }}>dashed Button</Button>
        <Button size="small" style={{ marginBottom: '20px' }}>small Button</Button>
        <Button size="large" style={{ marginBottom: '20px' }}>large Button</Button>
        <Button shape="circle" icon="plus" style={{ marginBottom: '20px', marginRight: '20px' }} />
        <Button shape="circle" dashed style={{ marginBottom: '20px' }}>btn</Button>
        <div style={{ width: '50vw' }}>
          <Button type="default">default width fill container</Button>
        </div>
      </div>
    );
  }
}
