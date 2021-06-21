import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

class Carousel extends React.PureComponent {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    defaultImg: CarouselSlide.propTypes.Img,
    defaultCarouselWrapper: PropTypes.elementType,
    defaultForwardButton: PropTypes.elementType,
    defaultBackButton: PropTypes.elementType,
  };

  static defaultProps = {
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
    defaultImg: CarouselSlide.defaultProps.Img,
    defaultCarouselWrapper: CarouselWrapper,
    defaultForwardButton: ForwardButton,
    defaultBackButton: BackButton,
  };

  state = {
    slideIndex: 0,
  };

  handlePrevClick = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({
      slideIndex: (slides.length + slideIndex - 1) % this.props.slides.length,
    }));
  };
  handleNextClick = () => {
    this.setState(({ slideIndex }) => ({
      slideIndex: (slideIndex + 1) % this.props.slides.length,
    }));
  };

  render() {
    const { slides, defaultImgHeight, defaultImg, ...rest } = this.props;
    return (
      <CarouselWrapper {...rest}>
        <CarouselSlide
          Img={defaultImg}
          imgHeight={defaultImgHeight}
          {...slides[this.state.slideIndex]}
        />
        <BackButton data-action="Prev" onClick={this.handlePrevClick}>
          &lt;
        </BackButton>
        <ForwardButton data-action="Next" onClick={this.handleNextClick}>
          &gt;
        </ForwardButton>
      </CarouselWrapper>
    );
  }
}

export default Carousel;
