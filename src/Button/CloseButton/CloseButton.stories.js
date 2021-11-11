import React from 'react';
import { default as CloseButtonComponent } from './index';

// inside your panel
// const { argTypes } = useArgTypes();

export default {
  title: 'PDS/Button/CloseButton',
  component: CloseButtonComponent,
};

const Template = (args) => {
  return <CloseButtonComponent {...args} />
};

export const CloseButton = Template.bind({});
CloseButton.storyName = 'CloseButton';