import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from 'Button';

describe('button test', () => {
  it('button snapshot', () => {
    const wrapper = Renderer.create((<Button>button</Button>)).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('click event', () => {
    const onClickFunc = jest.fn();
    const button = shallow(<Button onClick={onClickFunc}>button</Button>);
    button.simulate('click');

    expect(onClickFunc).toBeCalled();
  });
});
