import React, { useState, useEffect } from 'react';
import { default as ModalComponent, defaultHeaderProps } from './index';
import { useArgs } from '@storybook/client-api';
import SplashText from '../Text/SplashText';
import Button from '../Button';

export default {
  title: 'PDS/Modal',
  component: ModalComponent,
  argTypes: {
    isOpen: {
      options: [true, false],
      control: {
        type: 'boolean',
      },
    },
    headerMaxWidth: {
      description: 'Shortcut instead of adding a maxWidth key to headerProps. Should be a css value for maxWidth. eg 230px, 50%, none, etc',
    },
    maxWidth: {
      description: 'Should be a css value for maxWidth. eg 230px, 50%, none, etc',
    },
    escToClose: {
      description: 'Sets the ability for the user to hit the esc key to close the modal',
    },
    bgClickToClose: {
      description: 'Sets the ability for the user to click the background to close the modal',
    },
    onModalClose: {
      description: 'The callback to use for setting isOpen',
    },
    root: {
      control: false,
      description: 'The React node to render the modal into. Default is #root',
      table: {
        type: {
            summary: 'React.ReactNode'
        }
      },
    },
    headerText: {
      control: {
        type: 'text',
      }
    },
    headerProps: {
      control: {
        type: 'object'
      }
    }
  }
};

const Template = (args) => {
  const [_, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ ...args, isOpen: false });
  return (
    <ModalComponent {...args} onModalClose={handleClose}>
      <SplashText styleAlign="left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia lacus est, in iaculis lorem euismod sit amet. Integer ultricies diam in massa tempor pellentesque. Nulla facilisi. Donec eget justo magna.
      </SplashText>
      <Button onClick={handleClose}>Done</Button>
    </ModalComponent>
  )
};

export const Modal = Template.bind({});
Modal.args = {
  escToClose: true,
  headerText: 'Behold, I am the modal header text',
  maxWidth: '100%',
  headerMaxWidth: '370px',
  headerProps: defaultHeaderProps,
  isOpen: true,
};
