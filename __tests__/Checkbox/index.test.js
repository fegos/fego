import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Checkbox from 'Checkbox';

describe('Checkbox test', () => {
  it('checkbox snapshot', () => {
    const checkbox = Renderer.create(<Checkbox>checkbox</Checkbox>);
    expect(checkbox.toJSON()).toMatchSnapshot();
  });

  it('different props should render different classes', () => {
    const checkboxUnchecked = shallow(<Checkbox defaultChecked={false}>checkbox</Checkbox>);
    const checkboxChecked = shallow(<Checkbox defaultChecked>checkbox</Checkbox>);
    expect(checkboxUnchecked.find('.ns-checkbox-checked')).toHaveLength(0);
    expect(checkboxChecked.find('.ns-checkbox-checked')).toHaveLength(1);

    const checkboxDisabled = shallow(<Checkbox disabled={false}>checkbox</Checkbox>);
    const checkboxEnabled = shallow(<Checkbox disabled>checkbox</Checkbox>);
    expect(checkboxDisabled.find('.ns-checkbox-disabled')).toHaveLength(0);
    expect(checkboxEnabled.find('.ns-checkbox-disabled')).toHaveLength(1);
  });

  it('checkbox without children nor label should not render label class', () => {
    const checkboxWithoutLabel = shallow(<Checkbox />);
    expect(checkboxWithoutLabel.find('.ns-checkbox-label')).toHaveLength(0);
  });

  it('children prop will disable label prop', () => {
    const checkboxWithoutChildren = shallow(<Checkbox label="checkbox-label" />);
    const checkboxWithChildren = shallow(<Checkbox label="checkbox-label">checkbox-children</Checkbox>);

    expect(checkboxWithoutChildren.contains('checkbox-label')).toBe(true);
    expect(checkboxWithChildren.contains('checkbox-label')).toBe(false);
    expect(checkboxWithChildren.contains('checkbox-children')).toBe(true);
  });

  it('button with controlled prop check fires onChange event', () => {
    const oldCheckedValue = true;
    const newCheckedValue = false;
    const spyOnChange = sinon.spy((e) => {
      expect(spyOnChange.callCount).toEqual(1);
      expect(e.target.checked).toEqual(newCheckedValue);
    });

    const component = mount(<Checkbox checked={oldCheckedValue} onChange={spyOnChange}>checkbox</Checkbox>);

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

    const component = mount(<Checkbox defaultChecked={oldCheckedValue} onChange={spyOnChange}>checkbox</Checkbox>);

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

    const component = mount(<Checkbox disabled onChange={spyOnChange}>checkbox</Checkbox>);

    component.find('input').simulate('change', {
      nativeEvent: {
        target: {
          checked: true,
        },
      },
    });
  });

  it('trigger willRecieveProps lifecycle and state should change', () => {
    const checkbox = mount(<Checkbox checked={false}>checkbox</Checkbox>);
    const spy = sinon.spy(Checkbox.prototype, 'componentWillReceiveProps');

    expect(checkbox.state('checked')).toBe(false);

    checkbox.setProps({
      checked: true,
    });

    expect(checkbox.state('checked')).toBe(true);
    expect(spy.callCount).toBe(1);
  });
});
