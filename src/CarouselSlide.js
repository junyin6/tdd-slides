import React from 'react';
import PropTypes from 'prop-types';
const CarouselSlide = ({ imgURL, description, attribution, ...rest }) => {
  return (
    <figure {...rest}>
      <img src={imgURL} />
      <figcaption>
        <strong>{description}</strong> {attribution}
      </figcaption>
    </figure>
  );
};

CarouselSlide.propTypes = {
  imgURL: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  attribution: PropTypes.node,
};

export default CarouselSlide;
