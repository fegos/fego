import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Button from 'Button';
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

  it('fire click event', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc}>button</Button>);
    button.simulate('click');

    expect(onClickFunc).toHaveBeenCalledTimes(1);
  });

  it('disabled button don\'t fire click event', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc} disabled>button</Button>);
    button.simulate('click');

    expect(onClickFunc).toHaveBeenCalledTimes(0);
  });

  it('fire willReceiveProps lifecycle', () => {
    const button = mount(<Button loading>button</Button>);
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
  });

  it('fire unmount lifecycle', () => {
    const onClickFunc = jest.fn();
    const button = mount(<Button onClick={onClickFunc} loading={{ delay: 300 }}>button</Button>);
    button.simulate('click');
    button.simulate('click');
    button.unmount();
    expect(onClickFunc).toHaveBeenCalledTimes(1);
  });
});

describe('insert space', () => {
  it('button has two chinese characters as children: one space will be inserted', () => {
    const button = shallow(<Button>按钮</Button>);
    expect(button.contains('按 钮')).toBe(true);
  });

  it('button has two chinese characters and loading icon as children: one space will be inserted', () => {
    const button = shallow(<Button icon="loading">按钮</Button>);
    expect(button.contains('按 钮')).toBe(true);
    const button2 = shallow(<Button icon="home">按钮</Button>);
    expect(button2.contains('按钮')).toBe(true);
    expect(button2.contains('按 钮')).toBe(false);
  });

  it('button has object children which has two chinese characters: one space will be inserted', () => {
    const button = shallow(<Button><span>按钮</span></Button>);
    expect(button.contains('按 钮')).toBe(true);
    const button2 = shallow(<Button icon="loading"><span>按钮</span></Button>);
    expect(button2.contains('按 钮')).toBe(true);
    const button3 = shallow(<Button icon="home"><span>按钮</span></Button>);
    expect(button3.contains('按 钮')).toBe(false);
  });

  it('none chinese characters: one space will not be inserted', () => {
    const button = shallow(<Button>button</Button>);
    expect(button.contains('button')).toBe(true);
    const button2 = shallow(<Button><span>button</span></Button>);
    expect(button2.contains('button')).toBe(true);
  });

  it('none children: one space will not be inserted', () => {
    const button = shallow(<Button />);
    expect(button.children()).toHaveLength(0);
  });
});
