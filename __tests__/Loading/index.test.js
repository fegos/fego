import React from 'react';
import Renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Loading from 'Loading';

describe('Loading test', () => {
  const ctn = (
    <div>
      <p>文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容</p>
      <p>文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容</p>
      <p>文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容</p>
      <p>文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容</p>
    </div>
  );

  it('loading snapshot', () => {
    const loading = Renderer.create(<Loading loading>{ctn}</Loading>);
    expect(loading.toJSON()).toMatchSnapshot();
  });

  it('different loading type should render corrently', () => {
    const barLoading = shallow(<Loading loading type="bar">{ctn}</Loading>);
    expect(barLoading.find('.bar')).toHaveLength(3);
    expect(barLoading.find('.circle')).toHaveLength(0);

    const circleLoading = shallow(<Loading loading type="circle">{ctn}</Loading>);
    expect(circleLoading.find('.bar')).toHaveLength(0);
    expect(circleLoading.find('.circle')).toHaveLength(1);
  });

  it('element loading type should also render corrently', () => {
    const loading = shallow(<Loading loading type={<h3>for test</h3>}>{ctn}</Loading>);
    expect(loading.find('h3')).toHaveLength(1);
  });

  it('loading with tip should show the tip', () => {
    const loading = shallow(<Loading loading tip="test tip">{ctn}</Loading>);
    expect(loading.contains('test tip')).toBe(true);
  });

  it('component should response to props change, and render accordingly correct', () => {
    const loading = shallow(<Loading loading>{ctn}</Loading>);
    expect(loading.find('.ns-loading-ctn')).toHaveLength(1);
    loading.setProps({
      loading: false,
    });
    expect(loading.find('.ns-loading-ctn')).toHaveLength(0);
  });

  it('component with delay should response after the delay time', () => {
    jest.useFakeTimers();
    const loading = mount(<Loading loading={false} delay={1000}>{ctn}</Loading>);
    loading.setProps({
      loading: true,
    });
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    /**
     * in order to trigger code in cocmponentWillRecieveProps
     * if (this.timer) {
          clearTimeout(this.timer);
        }
    */
    loading.setProps({
      loading: true,
    });
  });
});
