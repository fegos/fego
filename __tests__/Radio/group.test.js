import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Radio from 'Radio';

const { Group } = Radio;

describe('Radio Group test', () => {
  let opts = [];
  beforeEach(() => {
    opts = [
      <Radio value="chi" key="0">语文</Radio>,
      <Radio value="mat" key="1">数学</Radio>,
      <Radio value="eng" key="2">英语</Radio>,
      <Radio value="phy" key="3">物理</Radio>,
      <Radio value="che" key="4">化学</Radio>,
      <Radio value="bio" key="5">生物</Radio>,
    ];
  });
  it('radio group snapshot', () => {
    const group = Renderer.create((
      <Group name="course1">
        {opts}
      </Group>
    ));
    expect(group.toJSON()).toMatchSnapshot();
  });

  it('radio group with options should also render correctly', () => {
    const options = [
      { label: '语文', value: 'chi' },
      { label: '数学', value: 'mat' },
      { label: '英语', value: 'eng', disabled: true },
      { label: '物理', value: 'phy' },
      { label: '化学', value: 'che' },
      { label: '生物', value: 'bio' },
    ];
    const group = shallow(<Group name="course2" options={options} />);
    expect(group.find(Radio)).toHaveLength(options.length);
  });

  it('prop value changes should trigger componentWillReceiveProps method', () => {
    const group = shallow((
      <Group name="course3" value="chi">
        {opts}
      </Group>
    ));
    const spy = sinon.spy(Group.prototype, 'componentWillReceiveProps');

    group.setProps({
      value: 'phy',
    });

    expect(spy.callCount).toBe(1);
  });

  it('radio onChange event should trigger radioGroup with value prop onChange callback', () => {
    const oldGroupValue = '';
    const newRadioValue = true;
    const spyRadioOnChange = sinon.spy((e) => {
      expect(spyRadioOnChange.callCount).toEqual(1);
      expect(e.target.checked).toEqual(newRadioValue);
    });
    const spyRadioGroupOnChange = sinon.spy(() => {
      expect(spyRadioGroupOnChange.callCount).toEqual(1);
    });

    const group = mount((
      <Group name="course4" value={oldGroupValue} onChange={spyRadioGroupOnChange}>
        <Radio onChange={spyRadioOnChange} value="0">radio</Radio>
      </Group>
    ));

    group.find('input').simulate('change', {
      nativeEvent: {
        target: {
          checked: newRadioValue,
        },
      },
    });
  });

  it('radio onChange event should trigger radioGroup with defaultValue prop onChange callback', () => {
    const oldGroupValue = '';
    const newRadioValue = false;
    const spyRadioOnChange = sinon.spy((e) => {
      expect(spyRadioOnChange.callCount).toEqual(1);
      expect(e.target.checked).toEqual(newRadioValue);
    });
    const spyRadioGroupOnChange = sinon.spy(() => {
      expect(spyRadioGroupOnChange.callCount).toEqual(1);
    });

    const group = mount((
      <Group name="course5" defaultValue={oldGroupValue} onChange={spyRadioGroupOnChange}>
        <Radio onChange={spyRadioOnChange} value="0">radio</Radio>
      </Group>
    ));

    group.find('input').simulate('change', {
      nativeEvent: {
        target: {
          checked: newRadioValue,
        },
      },
    });
  });
});
