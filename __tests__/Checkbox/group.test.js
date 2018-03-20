import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Checkbox from 'Checkbox';

const { Group } = Checkbox;

describe('Checkbox Group test', () => {
  let opts = [];
  beforeEach(() => {
    opts = [
      <Checkbox value="chi" key="0">语文</Checkbox>,
      <Checkbox value="mat" key="1">数学</Checkbox>,
      <Checkbox value="eng" key="2">英语</Checkbox>,
      <Checkbox value="phy" key="3">物理</Checkbox>,
      <Checkbox value="che" key="4">化学</Checkbox>,
      <Checkbox value="bio" key="5">生物</Checkbox>,
    ];
  });
  it('checkbox group snapshot', () => {
    const group = Renderer.create((
      <Group name="cbox1">
        {opts}
      </Group>
    ));
    expect(group.toJSON()).toMatchSnapshot();
  });

  it('checkbox group with options should also render correctly', () => {
    const options = [
      { label: '语文', value: 'chi' },
      { label: '数学', value: 'mat' },
      { label: '英语', value: 'eng', disabled: true },
      { label: '物理', value: 'phy' },
      { label: '化学', value: 'che' },
      { label: '生物', value: 'bio' },
    ];
    const group = shallow(<Group name="cbox2" options={options} />);
    expect(group.find(Checkbox)).toHaveLength(options.length);
  });

  it('prop value changes should trigger componentWillReceiveProps method', () => {
    const group = shallow((
      <Group name="cbox3" value={['chi']}>
        {opts}
      </Group>
    ));
    const spy = sinon.spy(Group.prototype, 'componentWillReceiveProps');

    group.setProps({
      value: ['chi', 'phy'],
    });

    expect(spy.callCount).toBe(1);
  });

  it('checkbox onChange event should trigger checkboxGroup with value prop onChange callback', () => {
    const oldGroupValue = [];
    const newCheckboxValue = true;
    const spyCheckboxOnChange = sinon.spy((e) => {
      expect(spyCheckboxOnChange.callCount).toEqual(1);
      expect(e.target.checked).toEqual(newCheckboxValue);
    });
    const spyCheckboxGroupOnChange = sinon.spy(() => {
      expect(spyCheckboxGroupOnChange.callCount).toEqual(1);
    });

    const group = mount((
      <Group name="cbox4" value={oldGroupValue} onChange={spyCheckboxGroupOnChange}>
        <Checkbox onChange={spyCheckboxOnChange} value="0">checkbox</Checkbox>
      </Group>
    ));

    group.find('input').simulate('change', {
      nativeEvent: {
        target: {
          checked: newCheckboxValue,
        },
      },
    });
  });

  it('checkbox onChange event should trigger checkboxGroup with defaultValue prop onChange callback', () => {
    const oldGroupValue = [];
    const newCheckboxValue = false;
    const spyCheckboxOnChange = sinon.spy((e) => {
      expect(spyCheckboxOnChange.callCount).toEqual(1);
      expect(e.target.checked).toEqual(newCheckboxValue);
    });
    const spyCheckboxGroupOnChange = sinon.spy(() => {
      expect(spyCheckboxGroupOnChange.callCount).toEqual(1);
    });

    const group = mount((
      <Group name="cbox4" defaultValue={oldGroupValue} onChange={spyCheckboxGroupOnChange}>
        <Checkbox onChange={spyCheckboxOnChange} value="0">checkbox</Checkbox>
      </Group>
    ));

    group.find('input').simulate('change', {
      nativeEvent: {
        target: {
          checked: newCheckboxValue,
        },
      },
    });
  });
});
