import React from 'react';
import { shallow } from 'enzyme';
import Button from 'Button';

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
