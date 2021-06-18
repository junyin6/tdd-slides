import { shallow } from 'enzyme';
import React from 'react';
import Carousel from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  let wrapper;
  const slides = [
    {
      imgUrl: 'https://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria',
    },
    {
      imgUrl: 'https://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis',
    },
    {
      imgUrl: 'https://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
  });

  it('renders a <div>', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('has an initial "slideIndex" of 0', () => {
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('renders a CarouselButton labeled "Prev"', () => {
    expect(wrapper.find(CarouselButton).at(0).prop('children')).toBe('Prev');
  });

  it('renders a CarouselButton labeled "Next"', () => {
    expect(wrapper.find(CarouselButton).at(1).prop('children')).toBe('Next');
  });

  describe('with the middle slide selected', () => {
    beforeEach(() => {
      wrapper.setState({ slideIndex: 1 });
    });
    it('increments `slideIndex` when Next is clicked ', () => {
      wrapper.find('[data-action="Next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(2);
    });

    it('decrements `slideIndex` when Prev is clicked', () => {
      wrapper.find('[data-action="Prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    });
  });

  describe('with the first slide selected', () => {
    it('wraps to the last slide, when "prev" is clicked', () => {
      wrapper.setState({ slideIndex: 0 });
      wrapper.find('[data-action="Prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(slides.length - 1);
    });
  });

  describe('with the last slide selected', () => {
    it('wraps to the first slide, when Next is clicked', () => {
      wrapper.setState({ slideIndex: 2 });
      wrapper.find('[data-action="Next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    });
  });
  it('renders the current slide as a CarouselSlide', () => {
    let slideProps;
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual(slides[0]);
    wrapper.setState({ slideIndex: 1 });
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual(slides[1]);
  });
});
