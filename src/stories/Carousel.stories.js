import React from 'react';
import Carousel from '../../src/Carousel';
import slides from '../../example/slides';

export default {
  component: Carousel,
  title: 'Carousel',
  argTypes: {
    onIndexChange: { action: 'onIndexChange' },
    autoAdvanceDelay: {
      control: {
        type: 'range',
        min: 50,
        max: 10000,
      },
    },
  },
};

const Template = (args) => <Carousel slides={slides} {...args} />;
export const Default = Template.bind();
