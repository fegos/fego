import React from 'react';
import Renderer from 'react-test-renderer';
import Icon from 'Radio';

describe('Icon test', () => {
  it('icon snapshot', () => {
    const icon = Renderer.create(<Icon name="yes" />);
    expect(icon.toJSON()).toMatchSnapshot();
  });
});
