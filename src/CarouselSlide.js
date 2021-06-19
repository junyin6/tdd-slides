import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: ${(props) =>
    typeof props.imgHeight === 'number'
      ? `${props.imgHeight}px`
      : props.imgHeight};
`;
const CarouselSlide = ({
  imgUrl,
  description,
  attribution,
  imgHeight,
  ...rest
}) => {
  return (
    <figure {...rest}>
      <Img src={imgUrl} imgHeight={imgHeight} />
      <figcaption>
        <strong>{description}</strong> {attribution}
      </figcaption>
    </figure>
  );
};

CarouselSlide.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  attribution: PropTypes.node,
  imgHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CarouselSlide.defaultProps = {
  imgHeight: 600,
};

export default CarouselSlide;
