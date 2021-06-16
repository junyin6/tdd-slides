import React from 'react';
import { shallow } from 'enzyme';
import CarouselSlide from '../CarouselSlide';

describe('CarouselSlide', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide
        imgURL="https://example.com/default.jpg"
        description="Default test image"
      />
    );
  });

  it('renders a <figure>', () => {
    expect(wrapper.type()).toBe('figure');
  });

  it('renders an <img> and <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toBe('img');
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes "imgURL" to <img>', () => {
    const imgURL = 'https://example.com/image.png';
    wrapper.setProps({ imgURL });
    const img = wrapper.find('img');
    expect(img.prop('src')).toBe(imgURL);
  });

  it('passes "description" to <strong> in <figcaption>', () => {
    const description = 'what did I tell you';
    const attribution = 'Jun Yin';
    wrapper.setProps({ description, attribution });
    expect(wrapper.find('figcaption strong').text()).toBe(description);
    expect(wrapper.find('figcaption').text()).toBe(
      `${description} ${attribution}`
    );
  });

  it('passes other props as children to <figure>', () => {
    const onClick = () => {};
    const style = {};
    const className = 'carousel-slide';

    wrapper.setProps({ onClick, style, className });

    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('style')).toBe(style);
    expect(wrapper.prop('className')).toBe(className);
  });
});
