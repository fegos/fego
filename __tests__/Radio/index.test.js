import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Radio from 'Radio';

describe('Radio test', () => {
  it('Radio snapshot', () => {
    const radio = Renderer.create(<Radio>radio</Radio>);
    expect(radio.toJSON()).toMatchSnapshot();
  });

  it('different props should render different classes', () => {
    const radioUnchecked = shallow(<Radio defaultChecked={false}>radio</Radio>);
    const radioChecked = shallow(<Radio defaultChecked>radio</Radio>);
    expect(radioUnchecked.find('.ns-radio-checked')).toHaveLength(0);
    expect(radioChecked.find('.ns-radio-checked')).toHaveLength(1);

    const radioDisabled = shallow(<Radio disabled={false}>radio</Radio>);
    const radioEnabled = shallow(<Radio disabled>radio</Radio>);
    expect(radioDisabled.find('.ns-radio-disabled')).toHaveLength(0);
    expect(radioEnabled.find('.ns-radio-disabled')).toHaveLength(1);
  });

  it('radio without children nor label should not render label class', () => {
    const radioWithoutLabel = shallow(<Radio />);
    expect(radioWithoutLabel.find('.ns-radio-label')).toHaveLength(0);
  });

  it('children prop will disable label prop', () => {
    const radioWithoutChildren = shallow(<Radio label="radio-label" />);
    const radioWithChildren = shallow(<Radio label="radio-label">radio-children</Radio>);

    expect(radioWithoutChildren.contains('radio-label')).toBe(true);
    expect(radioWithChildren.contains('radio-label')).toBe(false);
    expect(radioWithChildren.contains('radio-children')).toBe(true);
  });

  it('button with controlled prop check fires onChange event', () => {
    const oldCheckedValue = true;
    const newCheckedValue = false;
    const spyOnChange = sinon.spy((e) => {
      expect(spyOnChange.callCount).toEqual(1);
      expect(e.target.checked).toEqual(newCheckedValue);
    });

    const component = mount(<Radio checked={oldCheckedValue} onChange={spyOnChange}>radio</Radio>);

    component.find('input').simulate('change', {
      nativeEvent: {
        target: {
          checked: newCheckedValue,
        },
      },
    });
  });

  it('button with uncontrolled prop defaultCheck fires onChange event', () => {
    const oldCheckedValue = true;
    const newCheckedValue = false;
    const spyOnChange = sinon.spy((e) => {
      expect(spyOnChange.callCount).toEqual(1);
      expect(e.target.checked).toEqual(newCheckedValue);
    });

    const component = mount(<Radio defaultChecked={oldCheckedValue} onChange={spyOnChange}>radio</Radio>);

    component.find('input').simulate('change', {
      nativeEvent: {
        target: {
          checked: newCheckedValue,
        },
      },
    });
  });

  it('disabled button should not fire onChange event', () => {
    const spyOnChange = sinon.spy(() => {
      expect(spyOnChange.callCount).toEqual(0);
    });

    const component = mount(<Radio disabled onChange={spyOnChange}>radio</Radio>);

    component.find('input').simulate('change', {
      nativeEvent: {
        target: {
          checked: true,
        },
      },
    });
  });

  it('trigger willRecieveProps lifecycle and state should change', () => {
    const radio = mount(<Radio checked={false}>radio</Radio>);
    const spy = sinon.spy(Radio.prototype, 'componentWillReceiveProps');

    expect(radio.state('checked')).toBe(false);

    radio.setProps({
      checked: true,
    });

    expect(radio.state('checked')).toBe(true);
    expect(spy.callCount).toBe(1);
  });
});
