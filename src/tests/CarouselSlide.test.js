import React from 'react';
import { shallow, mount } from 'enzyme';
import CarouselSlide from '../CarouselSlide';

describe('CarouselSlide', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide
        imgUrl="https://example.com/default.jpg"
        description="Default test image"
      />
    );
  });

  it('renders a <figure>', () => {
    expect(wrapper.type()).toBe('figure');
  });

  it('renders an <img> and <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toBe(CarouselSlide.defaultProps.Img);
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes "imgUrl" to <img>', () => {
    const imgUrl = 'https://example.com/image.png';
    wrapper.setProps({ imgUrl });
    const img = wrapper.find(CarouselSlide.defaultProps.Img);
    expect(img.prop('src')).toBe(imgUrl);
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

describe('Img', () => {
  const imgUrl = 'https//whatever.com/123';
  const Img = CarouselSlide.defaultProps.Img;
  let mounted;
  beforeEach(() => {
    mounted = mount(<Img src={imgUrl} imgHeight={500} />);
  });

  it('renders an <img> with the given src', () => {
    expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true);
  });
});
