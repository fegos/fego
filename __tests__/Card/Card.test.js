import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Card from 'Card';

describe('Card test', () => {
  let ctn = null;
  const src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521464375182&di=14fc6d89cec9170987aa044e6de24d15&imgtype=0&src=http%3A%2F%2Fp0.ifengimg.com%2Fhaina%2F2017_08%2Fd4713af347c14f5_w600_h375.jpg';
  beforeEach(() => {
    ctn = (
      <div>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </div>
    );
  });

  afterEach(() => {
    ctn = null;
  });

  it('card snapshot', () => {
    const card = Renderer.create(<Card>{ctn}</Card>);
    expect(card.toJSON()).toMatchSnapshot();
  });

  it('card without border and hoverable', () => {
    const card = shallow(<Card border={false} hoverable={false}>{ctn}</Card>);
    expect(card.hasClass('ns-card-border')).toBe(false);
    expect(card.hasClass('ns-card-hoverable')).toBe(false);
  });

  it('card with string cover', () => {
    const card = shallow(<Card title="title" cover={src}>{ctn}</Card>);
    expect(card.find('img')).toHaveLength(1);
    expect(card.find('.ns-card-cover').hasClass('ns-card-cover-no-radius')).toBe(true);
  });

  it('card with element cover', () => {
    const card = shallow(<Card cover={<img src={src} alt="pic" />}>{ctn}</Card>);
    expect(card.find('img')).toHaveLength(1);
    expect(card.find('.ns-card-cover').hasClass('ns-card-cover-no-radius')).toBe(false);
  });

  it('card with array footer', () => {
    const card = shallow(<Card title="title" footer={['yes', 'no']}>{ctn}</Card>);
    expect(card.find('li')).toHaveLength(2);
    card.find('li').forEach((node, index) => {
      if (index === 0) {
        expect(node.text()).toEqual('yes');
      } else if (index === 1) {
        expect(node.text()).toEqual('no');
      }
    });
    // 直接这么写会报 TypeError: Cannot read property 'text' of undefined
    // 应该是取[0]/[1]之后节点的性质变了
    // 跟 $('div') 一样，取 $('div')[0] 之后变成了 js 的 dom 节点，就不能再应用 jquery 的方法了，如 $('div')[0].css();
    // expect(card.find('li')[0].text()).toEqual('yes');
    // expect(card.find('li')[1].text()).toEqual('no');
  });

  it('card with string footer', () => {
    const card = shallow(<Card title="title" footer="footer">{ctn}</Card>);
    expect(card.find('li')).toHaveLength(0);
    expect(card.find('.ns-card-footer-txt')).toHaveLength(1);
  });

  it('card with element footer', () => {
    const card = shallow(<Card title="title" footer={<span>footer</span>}>{ctn}</Card>);
    expect(card.find('li')).toHaveLength(0);
    expect(card.find('.ns-card-footer-txt')).toHaveLength(0);
  });
});
