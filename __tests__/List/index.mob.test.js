import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import List from 'List/index.mob';

const { Item } = List;

describe('List mobile test', () => {
  it('List snapshot', () => {
    const list = Renderer.create(<List><Item title="title" /></List>);
    expect(list.toJSON()).toMatchSnapshot();
  });
});

describe('ListItem mobile test', () => {
  let setStateSpy = null;
  let setStateSpyCallCount = 0;
  beforeAll(() => {
    setStateSpy = sinon.spy(Item.prototype, 'setState');
  });
  afterAll(() => {
    setStateSpy.restore();
  });
  beforeEach(() => {
    setStateSpyCallCount = setStateSpy.callCount;
  });

  it('component should render correspond to props passed to it', () => {
    const itemAll = shallow(<Item title="title" subTitle="subtitle" iconName="yes" extra="extra" slip hasRightArrow />);
    const itemNone = shallow(<Item title="title" hasRightArrow={false} />);

    // sub title
    expect(itemAll.find('.ns-list-sub-title')).toHaveLength(1);
    expect(itemNone.find('.ns-list-sub-title')).toHaveLength(0);

    // icon
    expect(itemAll.childAt(0).childAt(0).is('.ns-list-icon')).toBe(true);
    expect(itemNone.childAt(0).childAt(0).is('.ns-list-icon')).toBe(false);

    // extra
    expect(itemAll.find('.ns-list-extra')).toHaveLength(1);
    expect(itemNone.find('.ns-list-extra')).toHaveLength(0);

    // slip
    expect(itemAll.find('.ns-list-item-del')).toHaveLength(1);
    expect(itemNone.find('.ns-list-item-del')).toHaveLength(0);

    // right arrow
    expect(itemAll.childAt(0).children().last().is('.ns-list-arrow')).toBe(true);
    expect(itemNone.childAt(0).children().last().is('.ns-list-arrow')).toBe(false);
  });

  it('children props should disable title and sub-title', () => {
    const item = shallow(<Item title="title" subTitle="subtitle">children</Item>);
    expect(item.contains('title')).toBe(false);
    expect(item.contains('subtitle')).toBe(false);
    expect(item.contains('children')).toBe(true);
  });

  it('item with link props should render as a Link', () => {
    const itemLink = shallow(<Item title="title" link="http://fe.hhtcex.com" />);
    const item = shallow(<Item title="title" />);

    expect(item.name()).toEqual('div');
    expect(itemLink.name()).toEqual('Link');
  });

  it('mock touchstart event', () => {
    const item = mount(<Item title="title" />);
    const e = {
      nativeEvent: {
        changedTouches: [{
          pageX: 0,
          pageY: 100,
          screenX: 10,
          screenY: 110,
        }],
      },
    };

    item.simulate('touchstart', e);
    // 因为 touchstart 的事件处理函数会调用 setState, 以此来间接验证事件处理函数的执行
    setStateSpyCallCount++;
    expect(setStateSpy.callCount).toBe(setStateSpyCallCount);
    expect(item.state().clicked).toBe(true);
    // this will not trigger setStateSpyCallCount increase 1
    item.simulate('touchstart', e);
    expect(setStateSpy.callCount).toBe(setStateSpyCallCount);
  });

  it('mock touchmove event', () => {
    const itemDisableMove = mount(<Item title="title" />);
    itemDisableMove.simulate('touchmove'); // will not trigger setStateSpyCallCount increase 1
    expect(setStateSpy.callCount).toBe(setStateSpyCallCount);

    const item = mount(<Item title="title" slip />);

    // 先触发 touchstart, 保存touch事件的信息
    item.simulate('touchstart', {
      nativeEvent: {
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 100,
          screenY: 100,
        }],
      },
    });
    // touchstart 会调用 setState
    expect(setStateSpy.callCount).toBe(setStateSpyCallCount + 1);
    setStateSpyCallCount++; // 手动更新值
    expect(item.state().clicked).toBe(true);
    // 先触发 touchmove
    item.simulate('touchmove', {
      nativeEvent: {
        target: {
          offsetHeight: 10,
        },
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 10,
          screenY: 80, // 将会导致 Math.abs(diffScreenY) > touchEvent.target.offsetHeight， touchmove return, 因此只有 touchstart 执行了一次setState
        }],
      },
    });
    // touchmove 不会调用 setState，所以 callcount 还是以前的值
    expect(setStateSpy.callCount).toBe(setStateSpyCallCount);

    item.simulate('touchmove', {
      nativeEvent: {
        target: {
          offsetHeight: 10,
        },
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 10, // 10 < 100, 所以模拟的是左滑
          screenY: 100,
        }],
      },
    });
    // 触发 setstate 并手动更新 callcount
    expect(setStateSpy.callCount).toBe(setStateSpyCallCount + 1);
    setStateSpyCallCount++;

    item.simulate('touchmove', {
      nativeEvent: {
        target: {
          offsetHeight: 10,
        },
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 150, // 150 > 100, 所以模拟的是右滑
          screenY: 100,
        }],
      },
    });

    expect(setStateSpy.callCount).toBe(setStateSpyCallCount + 1);
  });

  it('mock touchend event', () => {
    const onClickFunc = jest.fn();
    const item = mount(<Item title="title" onClick={onClickFunc} />);
    const e = {
      nativeEvent: {
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 100,
          screenY: 100,
        }],
      },
    };
    item.simulate('touchstart', e);
    item.simulate('touchend', e);
    expect(item.state().moving).toBe(false);
    expect(item.state().expand).toBe(false);
    expect(onClickFunc).toHaveBeenCalledTimes(1);
  });

  it('mock touchcancel event', () => {
    const item = mount(<Item title="title" />);
    item.simulate('touchstart', {
      nativeEvent: {
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 100,
          screenY: 100,
        }],
      },
    });
    expect(item.state().clicked).toBe(true);
    item.simulate('touchcancel');
    expect(setStateSpy.callCount).toBe(setStateSpyCallCount + 2);
    expect(item.state().clicked).toBe(false);
    expect(item.state().moving).toBe(false);
  });
});

describe('mock touchend event for slip item', () => {
  let item = null;
  let onClickFunc;
  beforeEach(() => {
    onClickFunc = jest.fn();
    item = mount(<Item title="title" slip onClick={onClickFunc} />);
    // 先触发 touchstart, 保存touch事件的信息
    item.simulate('touchstart', {
      nativeEvent: {
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 100,
          screenY: 100,
        }],
      },
    });
  });
  it('touchend when moving - Y 方向移动距离超过了 item 高度，作罢', () => { // 原谅夹杂了中文。。。
    // 模拟移动中触发的touchend事件
    item.setState({
      moving: true,
    });
    item.simulate('touchend', {
      nativeEvent: {
        target: {
          offsetHeight: 10,
        },
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 10,
          screenY: 80,
        }],
      },
    });
    expect(item.state().expand).toBe(false);
    expect(item.state().left).toBe(0);
    expect(onClickFunc).toHaveBeenCalledTimes(0);
  });
  it('touchend when moving - 右滑', () => {
    // 模拟移动中触发的touchend事件
    item.setState({
      moving: true,
    });
    item.simulate('touchend', {
      nativeEvent: {
        target: {
          offsetHeight: 10,
        },
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 110,
          screenY: 100,
        }],
      },
    });
    expect(item.state().expand).toBe(false);
    expect(item.state().left).toBe(0);
    expect(onClickFunc).toHaveBeenCalledTimes(0);
  });
  it('touchend when moving - 左滑超过一半展开', () => {
    // 模拟移动中触发的touchend事件
    item.setState({
      moving: true,
    });
    item.simulate('touchend', {
      nativeEvent: {
        target: {
          offsetHeight: 10,
        },
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 0,
          screenY: 100,
        }],
      },
    });
    expect(item.state().expand).toBe(true);
    expect(item.state().left).toBe(-88);
    expect(onClickFunc).toHaveBeenCalledTimes(0);
  });
  it('touchend when moving - 左滑未超过一半不展开', () => {
    // 模拟移动中触发的touchend事件
    item.setState({
      moving: true,
    });
    item.simulate('touchend', {
      nativeEvent: {
        target: {
          offsetHeight: 10,
        },
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 80,
          screenY: 100,
        }],
      },
    });
    expect(item.state().expand).toBe(false);
    expect(item.state().left).toBe(0);
    expect(onClickFunc).toHaveBeenCalledTimes(0);
  });
  it('touchend when moving - 已展开的，touchend 收起', () => {
    // 模拟已展开的touchend
    item.setState({
      expand: true,
    });
    item.simulate('touchend', {
      nativeEvent: {
        target: {
          offsetHeight: 10,
        },
        changedTouches: [{
          pageX: 0,
          pageY: 0,
          screenX: 80,
          screenY: 100,
        }],
      },
    });
    expect(item.state().expand).toBe(false);
    expect(item.state().left).toBe(0);
    expect(onClickFunc).toHaveBeenCalledTimes(0);
  });
});
