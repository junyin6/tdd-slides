import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HasIndex from './HasIndex';
import AutoAdvances from './AutoAdvances';

const CarouselWrapper = styled.div`
  position: relative;
  background-color: black;
  color: #f8f9fa;
`;

const BackButton = styled(CarouselButton)`
  position: absolute;
  margin: 0.5rem;
  padding: 1rem;
  height: 600px;
  left: 0;
  top: 0;
  border: none;
  background: rgba(0, 0, 0, 0.3);
  font-size: 2rem;
  color: #f8f9fa;
  /* top: calc(600px / 2); */
  /* transform: translateY(-50%); */
`;
const ForwardButton = styled(CarouselButton)`
  position: absolute;
  margin: 0.5rem;
  padding: 1rem;
  height: 600px;
  right: 0;
  top: 0;
  border: none;
  background: rgba(0, 0, 0, 0.3);
  font-size: 2rem;
  color: #f8f9fa;
`;

export const Carousel = (props) => {
  const handlePrevClick = () => {
    const { slides, slideIndexDecrement } = props;
    slideIndexDecrement(slides.length);
  };

  const handleNextClick = () => {
    const { slides, slideIndexIncrement } = props;
    slideIndexIncrement(slides.length);
  };

  const {
    slides,
    slideIndex,
    defaultImgHeight,
    defaultImg,
    slideIndexIncrement: _slideIndexIncrement,
    slideIndexDecrement: _slideIndexDecrement,
    ...rest
  } = props;

  return (
    <CarouselWrapper {...rest}>
      <CarouselSlide
        Img={defaultImg}
        imgHeight={defaultImgHeight}
        {...slides[slideIndex]}
      />
      <BackButton data-action="Prev" onClick={handlePrevClick}>
        &lt;
      </BackButton>
      <ForwardButton data-action="Next" onClick={handleNextClick}>
        &gt;
      </ForwardButton>
    </CarouselWrapper>
  );
};

Carousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
    .isRequired,
  slideIndex: PropTypes.number.isRequired,
  slideIndexIncrement: PropTypes.func.isRequired,
  slideIndexDecrement: PropTypes.func.isRequired,
  defaultImgHeight: CarouselSlide.propTypes.imgHeight,
  defaultImg: CarouselSlide.propTypes.Img,
  defaultCarouselWrapper: PropTypes.elementType,
  defaultForwardButton: PropTypes.elementType,
  defaultBackButton: PropTypes.elementType,
};

Carousel.defaultProps = {
  defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  defaultImg: CarouselSlide.defaultProps.Img,
  defaultCarouselWrapper: CarouselWrapper,
  defaultForwardButton: ForwardButton,
  defaultBackButton: BackButton,
};

export default HasIndex(
  AutoAdvances(Carousel, 'slideIndex', 'slides'),
  'slideIndex'
);
