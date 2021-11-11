import styled from 'styled-components';

export const BaseButtonStyle = styled.button`
  font-family: inherit;
  color: ${props => props.inverted ? props.theme.button.backgroundColor.default : props.theme.button.color.default};
  background-color: ${props => props.inverted ? props.theme.button.color.default : props.theme.button.backgroundColor.default};
  padding: ${props => props.theme.button.padding.default};
  font-size: ${props => props.theme.button.fontSize.default};
  border: ${props => props.theme.button.border.default};
  height: ${props => props.theme.button.height.default};
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${props => props.centered ? 'center' : 'space-between'};
  align-items: center;
  transition: transform 250ms ease-in-out;
  &:hover {
    border-style: dashed;
    transform: translate(2px, 2px);
  }
`;
