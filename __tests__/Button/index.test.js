import React from 'react';
import Renderer from 'react-test-renderer';
import Button from 'Button';

describe('button test', () => {
  it('button snapshot', () => {
    const wrapper = Renderer.create((<Button />)).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
