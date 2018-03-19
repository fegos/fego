import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Button from 'Button/index.mob';
import Icon from 'Icon';

describe('button test', () => {
  it('button snapshot', () => {
    const button = Renderer.create((<Button>button</Button>)).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('different type of button', () => {
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

  it('button with icon', () => {
    const button = mount(<Button icon="home">button</Button>);
    expect(button.find('.nsicon')).toHaveLength(1);
  });

  it('loading button', () => {
    const button = shallow(<Button loading>button</Button>);
    expect(button.find(Icon)).toHaveLength(1);
    expect(button.find('.ns-btn-loading')).toHaveLength(1);
  });

  it('fire touchstart event', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc}>button</Button>);
    const disabledButton = mount(<Button onClick={onClickFunc} disabled>button</Button>);
    expect(button.state('clicked')).toBe(false);
    expect(disabledButton.state('clicked')).toBe(false);
    button.simulate('touchstart');
    button.simulate('touchstart');
    disabledButton.simulate('touchstart');
    // 移动端的 touchstart 事件，但是 enzyme 貌似不能区分，所以此处的 touchstart 并不是手指按下就不松开了
    // 而是按下-松开这整个过程都有，只不过只会显示的调用 onTouchStart 的回调罢了
    expect(button.state('clicked')).toBe(true);
    expect(disabledButton.state('clicked')).toBe(false);
    expect(onClickFunc).toHaveBeenCalledTimes(0);
  });

  it('fire touchend event', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc}>button</Button>);

    button.simulate('touchend');

    expect(onClickFunc).toHaveBeenCalledTimes(1);
  });

  it('fire willReceiveProps lifecycle', () => {
    const button = mount(<Button loading>button</Button>);
    expect(button.state('loading')).toBe(true);
    button.setProps({
      loading: false,
    });
    expect(button.state('loading')).toBe(false);
  });
});
