import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Button from 'Button/index.mob';
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

  it('fire touchstart event', () => {
    const button = mount(<Button>button</Button>);

    expect(button.state('clicked')).toBe(false);

    button.simulate('touchstart');

    expect(button.state('clicked')).toBe(true);
  });

  it('fire touchstart two time should only trigger setState one time', () => {
    const button = mount(<Button>button</Button>);
    const spy = sinon.spy(Button.prototype, 'setState');

    button.simulate('touchstart');
    button.simulate('touchstart');

    expect(spy.callCount).toBe(1);

    spy.restore();
  });


  it('disabled button should fire touchstart but change nothing', () => {
    const button = mount(<Button disabled>button</Button>);

    expect(button.state('clicked')).toBe(false);

    button.simulate('touchstart');

    expect(button.state('clicked')).toBe(false);
  });

  it('fire touchend event', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc}>button</Button>);

    button.simulate('touchend');

    expect(onClickFunc).toHaveBeenCalledTimes(1);
  });

  it('fire willReceiveProps lifecycle, and state should change', () => {
    const button = mount(<Button loading>button</Button>);
    expect(button.state('loading')).toBe(true);
    button.setProps({
      loading: false,
    });
    expect(button.state('loading')).toBe(false);
  });
});
