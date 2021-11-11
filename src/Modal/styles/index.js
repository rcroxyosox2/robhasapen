import styled, { css } from 'styled-components';
import mixins from '../../Themes/mixins';

export const ModalContainerInnerStyle = styled.div.attrs({className: 'ModalInnerContainerStyle'})`
  margin: 0 auto;
`;

export const ModalSplashHeaderStyle = styled.h3.attrs({className: 'ModalSplashHeaderStyle'})`
  margin: 0 ${ props => (props.styleAlign && props.styleAlign !== 'center') ? '0' : 'auto' } ${ props => props.noMargin ? '0' : '5%' };
  font-family: ${ props => props.theme.fonts.serif.name};
  font-size: ${props => `${22 / parseInt(props.theme.globals.baseFontSize.default, 10)}rem`};
  text-align: ${props => props.centered ? 'center' : 'left'};
  max-width: 90%;
  font-weight: normal;
  line-height: 1.3em;
  @media only screen and (max-width: ${ props => props.theme.responsive.computerBreakpoint }) {
    max-width: 100%;
    font-size: ${props => `${18 / parseInt(props.theme.globals.baseFontSize.default, 10)}rem`}
  }
  text-align: ${ props => props.styleAlign ? props.styleAlign : 'center'};
  margin-bottom: 1.5em;
`;

const ModalContainerStyle = styled.div.attrs({className: 'ModalContainerStyle'})`
  transition: opacity 320ms ease-out, transform 320ms ease-out;
  background: transparent;
  position: fixed;
  display: flex;
  overflow-x: hidden;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  z-index: 101;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
  ${props => {
    let translateY = '-2%';
    let opacity = '0';
    let scale = '0.7';
    let overflow = 'hidden';

    if (props.animationStatus === 'entered') {
      opacity = '1';
      translateY = '0';
      scale = '1';
      overflow = 'auto';
    }
    return css`
      opacity: ${opacity};
      transform: translateY(${translateY}) scale(${scale});
      overflow-y: ${overflow};
    `;
  }}
  @media only screen and (max-width: ${ props => props.theme.responsive.computerBreakpoint}) {
    display: block;
    background: ${ props => props.theme.colors.white };
  }
`;

const CloseContainerStyle = styled.div.attrs({className: 'CloseContainerStyle'})`
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
`;

const ModalContentStyle = styled.div.attrs({className: 'ModalContentStyle'})`
  transition: all 320ms ease-in-out;
  background: ${ props => props.theme.colors.white };
  box-sizing: border-box;
  margin: 5% 0;
  box-shadow: 0 0 200px ${ props => mixins.rgba(props.theme.colors.black, 0.3) };
  position: relative;
  max-width: ${ props => props.maxWidth };
  width: ${ props => props.width };
  padding: 40px;
  @media only screen and (max-width: ${ props => props.theme.responsive.computerBreakpoint}) {
    width: 100%;
    margin: 0;
    padding: 80px 50px;
    max-width: 100%;
    box-shadow: none;
  }
  @media only screen and (max-width: calc(${ props => props.theme.responsive.mobileMidBreakpoint} - 1px)) {
    padding: 80px 30px;
  }
`;

export {
  CloseContainerStyle,
  ModalContainerStyle,
  ModalContentStyle
}