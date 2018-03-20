import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Button from 'Button';
import Icon from 'Icon';

describe('button test', () => {
  it('button snapshot', () => {
    const button = Renderer.create((<Button>button</Button>)).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('different type of button will render different classes', () => {
    const defaultButton = shallow(<Button type="default">button</Button>);
    const primaryButton = shallow(<Button type="primary">button</Button>);
    const dangerButton = shallow(<Button type="danger">button</Button>);
    const ghostButton = shallow(<Button type="ghost">button</Button>);

    expect(defaultButton.find('.ns-btn-default')).toHaveLength(1);
    expect(defaultButton.find('.ns-btn-primary')).toHaveLength(0);
    expect(primaryButton.find('.ns-btn-primary')).toHaveLength(1);
    expect(primaryButton.find('.ns-btn-danger')).toHaveLength(0);
    expect(dangerButton.find('.ns-btn-danger')).toHaveLength(1);
    expect(dangerButton.find('.ns-btn-ghost')).toHaveLength(0);
    expect(ghostButton.find('.ns-btn-ghost')).toHaveLength(1);
    expect(ghostButton.find('.ns-btn-default')).toHaveLength(0);
  });

  it('button with icon prop will render a icon', () => {
    const button = mount(<Button icon="home">button</Button>);
    expect(button.find('.nsicon')).toHaveLength(1);
  });

  it('loading button will render a loading icon', () => {
    const button = shallow(<Button loading>button</Button>);
    expect(button.find(Icon)).toHaveLength(1);
    expect(button.find('.ns-btn-loading')).toHaveLength(1);
  });

  it('fire click event, callback should be called', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc}>button</Button>);
    button.simulate('click');

    expect(onClickFunc).toHaveBeenCalledTimes(1);
  });

  it('disabled button doesn\'t fire click event, and callback should not be called', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc} disabled>button</Button>);
    button.simulate('click');

    expect(onClickFunc).toHaveBeenCalledTimes(0);
  });

  it('fire willReceiveProps lifecycle, and state should change', () => {
    const button = mount(<Button loading>button</Button>);
    const spy = sinon.spy(Button.prototype, 'componentWillReceiveProps');

    expect(button.state('loading')).toBe(true);

    button.setProps({
      loading: false,
    });

    expect(button.state('loading')).toBe(false);

    button.setProps({
      loading: {
        delay: 300,
      },
    });

    expect(spy.callCount).toBe(2);

    spy.restore();
  });

  it('two click event should only trigger one time onClick callback', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc} loading={{ delay: 300 }}>button</Button>);
    button.simulate('click');
    button.simulate('click');
    expect(onClickFunc).toHaveBeenCalledTimes(1);
  });

  it('fire unmount lifecycle, and componentWillUnmount should be called', () => {
    const button = mount(<Button loading={{ delay: 300 }}>button</Button>);
    const spy = sinon.spy(Button.prototype, 'componentWillUnmount');
    button.unmount();
    expect(spy.calledOnce).toBe(true);
    spy.restore();
  });
});
