import { shallow, mount } from 'enzyme';
import React from 'react';
import Carousel, { Carousel as CoreCarousel } from '../Carousel';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
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

  describe('Component with HOC', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Carousel slides={slides} />);
    });

    it('sets slideIndex={0} on the core Component', () => {
      expect(wrapper.find(CoreCarousel).prop('slideIndex')).toBe(0);
    });

    it('passes slides down to the coreComponent', () => {
      expect(wrapper.find(CoreCarousel).prop('slides')).toBe(slides);
    });
    it('allows `slideIndex` to be controlled', () => {
      const mounted = mount(<Carousel slides={slides} slideIndex={1} />);
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(1);
      mounted.setProps({ slideIndex: 2 });
      expect(mounted.find(CoreCarousel).prop('slideIndex')).toBe(2);
    });
  });

  describe('core Component', () => {
    const slideIndexIncrement = jest.fn();
    const slideIndexDecrement = jest.fn();
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <CoreCarousel
          slides={slides}
          slideIndex={0}
          slideIndexIncrement={slideIndexIncrement}
          slideIndexDecrement={slideIndexDecrement}
        />
      );
    });
    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders the current slide as a CarouselSlide', () => {
      let slideProps;
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...slides[0],
        ...CarouselSlide.defaultProps,
      });
      wrapper.setProps({ slideIndex: 1 });
      slideProps = wrapper.find(CarouselSlide).props();
      expect(slideProps).toEqual({
        ...slides[1],
        ...CarouselSlide.defaultProps,
      });
    });

    it('increments `slideIndex` when Next is clicked ', () => {
      wrapper.find('[data-action="Next"]').simulate('click');
      expect(slideIndexIncrement).toHaveBeenCalledWith(slides.length);
    });

    it('decrements `slideIndex` when Prev is clicked', () => {
      wrapper.find('[data-action="Prev"]').simulate('click');
      expect(slideIndexDecrement).toHaveBeenCalledWith(slides.length);
    });

    it('passes defaultImg and defaultHeight to CarouselSlide', () => {
      const defaultImg = () => 'default';
      const defaultImgHeight = '100';
      wrapper.setProps({ defaultImg, defaultImgHeight });
      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
        defaultImgHeight
      );
    });

    it('allows individual slides to override defaultImg and defaultImgHeight', () => {
      const Img = () => 'default';
      const imgHeight = '100';
      wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });
      expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
      expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
    });
  });
});

describe('CarouselWrapper', () => {
  const CarouselWrapper = CoreCarousel.defaultProps.defaultCarouselWrapper;
  it('renders correctly', () => {
    let mounted = mount(<CarouselWrapper />);
    expect(mounted.find('div')).toMatchSnapshot();
  });
});

describe('ForwardButton', () => {
  const ForwardButton = CoreCarousel.defaultProps.defaultForwardButton;
  const text = 'buttonText';
  it('renders correctly', () => {
    let mounted = mount(<ForwardButton>{text}</ForwardButton>);
    expect(mounted.find('button')).toMatchSnapshot();
  });
});

describe('BackButton', () => {
  const BackButton = CoreCarousel.defaultProps.defaultBackButton;
  const text = 'buttonText';
  it('renders correctly', () => {
    let mounted = mount(<BackButton>{text}</BackButton>);
    expect(mounted.find('button')).toMatchSnapshot();
  });
});
