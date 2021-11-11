import styled from 'styled-components';
import i18n from '../i18n';
import mixins from '../../../Themes/mixins';

export const CloseButtonStyle = styled.button.attrs({className: 'CloseButtonStyle', tabIndex: 0, 'aria-label': i18n.close})`
  ${ mixins.appearance('none') }
  -webkit-tap-highlight-color: transparent;
  background: none;
  border: none;
  width: 25px;
  height: 25px;
  position: absolute;
  display: inline-block;
  right: 10px;
  top: 10px;
  cursor: pointer;

  &::before, &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    position: absolute;
    background: ${ props => props.theme.colors.black };
    left: 0;
    top: 50%;
  }
  &::before {
    transform: rotate(-45deg);
  }
  &::after {
    transform: rotate(45deg);
  }
`;
