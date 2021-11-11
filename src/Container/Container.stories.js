import styled from 'styled-components'
import React from 'react';
import Theme from '../Themes/main';
import Header from '../Header';
import { default as ContainerComponent } from './index';

// inside your panel
// const { argTypes } = useArgTypes();

export default {
  title: 'PDS/Container',
  component: ContainerComponent,
  argTypes: {
    styleSize: {
      description: 'Affects only desktop. Sets max-width to 1000px or 700px based on default or small sizes respectively',
    },
    styleAlign: {
      description: 'How to align the content within the container',
    },
    styleAlignMobile: {
      description: 'How to align the content within the container on mobile',
    },
    styleGutterSize: {
      description: 'The size of the padding on the left and right of the container after the window size becomes less than the container size',
    },
    flex: {
      description: 'Sets container to flex model with a row layout. Best used in conjuction with mobileColumn `true` when wanting a row layout on desktop, but column on mobile',
    },
    mobileCollapse: {
      description: 'Remove the gutters on mobile',
    },
    mobileColumn: {
      description: 'See the flex prop for use case',
    }
  },
};

const ContainerWrapperStyle = styled.div`
  border: 1px dashed ${Theme.line.color.default};
  padding: 3rem;
  > * {
    gap: 2em;
    border: 1px dashed ${Theme.colors.pointBlack};
  }
`;

const Template = (args) => {
  return (
    <ContainerWrapperStyle>
      <ContainerComponent {...args}>
        <Header styleSize="large" styleSizeMobile="default">Content inside container</Header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elit sapien, hendrerit ut risus blandit, pulvinar mollis elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elit sapien, hendrerit ut risus blandit.
        </p>
      </ContainerComponent>
    </ContainerWrapperStyle>
  )
};

export const Container = Template.bind({});
Container.args = {
  styleSize: 'default',
  styleAlign: 'left',
  styleAlignMobile: 'left',
  styleGutterSize: 'default',
};
