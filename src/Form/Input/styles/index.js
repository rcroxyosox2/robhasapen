import styled, { css } from 'styled-components';
import mixins from '../../../Themes/mixins';
import { FormComponentStyle } from '../../styles';
import { HelpTextStyle, HelpTextAnimatedStyle } from '../../HelpText/styles';
import { IconStyle, getIconInComponentCSS } from '../../../Icon/styles';

const animationSpeed = '.15s';

export const LabelStyle = styled.label.attrs({className: 'Label'})`
    position: relative;
    display: block;
    margin: 0 auto;
    width: ${props => (props.block) ? '100%' : 'auto' };
`;

export const LabelTextStyle = styled.span.attrs({className: 'LabelTextStyle'})`
  cursor: text;
  min-height: 100%;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: block;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  margin: 0;
  position: absolute;
  text-align: ${props => props.styleAlign };
  justify-content: ${props => mixins.styleAlignToFlexAlign(props.styleAlign) };
  text-overflow: ellipsis;
  white-space: nowrap;
  will-change: font-size;
  z-index: 4;
  overflow: hidden;

  &::before {
    width: ${props => (props.active) ? '100%' : 0};
    height: ${props => (props.active) ? '50%' : 0};
    content: '';
    display: block;
    transition: background-color ${animationSpeed} ease-out;
    background-color: ${props => mixins.getBackgroundColor('input', props)};
    position: absolute;
    left: 0px;
    top: 50%;
    z-index: -1;
  }


  ${props => {
    const padding = props.theme.input.padding[props.styleSize];
    const paddingLR = padding.leftRight;
    const paddingMobile = props.theme.input.padding.small;
    const paddingLRMobile = paddingMobile.leftRight;
    const centered = (props.styleAlign === 'center');

    const getLabelXPosition = (inputPadding) => `${parseFloat(inputPadding, 10) * 0.9}rem`;

    if (props.active) {
      return css`
        padding: ${ (props.iconType && props.iconStyleAlign === 'center') ? '0 .3em 0 19px' : '0 .3em' };
        width: auto;
        min-height: 0%;
        height: auto;
        transform: ${(centered) ? `translate(-50%, -50%)` : `translate(0, -50%)` };
        transition: font-size ${animationSpeed} ease-out${(!centered) ? `, transform ${animationSpeed} ease-out` : '' };
        transform-origin: left center;
        top: -1px;
        ${props.styleAlign === 'right' ? 'right' : 'left'}: ${(centered) ? '50%' : getLabelXPosition(paddingLR)};
        font-size: ${props.theme.input.animatedLabelFontSize};
        @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
          ${props.styleAlign === 'right' ? 'right' : 'left'}: ${(centered) ? '50%' : getLabelXPosition(paddingLRMobile)};
        }
      `;
    } else {
      return css`
        padding: ${ mixins.getComponentPaddingForStyleSize(props.styleSize, 'input', props) };
        top: 0;
        padding-top: 0;
        padding-bottom: 0;
        display: flex;
        align-items: center;
        @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
          padding: ${props => mixins.getComponentPaddingForStyleSize('small', 'input', props) };
        }
      `;
    }
  }
}
`;

export const InputStyle = styled.input.attrs({className: 'InputStyle'})`
  ${ mixins.appearance('none') }
  border-radius: 0;
  box-sizing: border-box;
  outline: none;
  padding: ${props => mixins.getComponentPaddingForStyleSize(props.styleSize, 'input', props) };
  transition: all .15s ease-out;
  background-color: ${props => mixins.getBackgroundColor('input', props)};
  border-color: ${props => mixins.getBorderColor('input', props)};

  &:-webkit-autofill{
    box-shadow: 0 0 0 100px ${props => props.theme.input.autoFill.backgroundColor.default } inset !important;
    border-color: ${props => props.theme.input.autoFill.borderColor.default } !important;
    + ${LabelTextStyle} {
      &::before {
        background-color: ${props => props.theme.input.autoFill.backgroundColor.default};
      }
    }
  }
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  font-size: ${props => {
    const fontSize = props.theme.input.fontSize[props.styleSize];
    return fontSize ? fontSize : props.theme.input.fontSize.default;
  }};
  font-family: inherit;
  font-weight: inherit;
  color: ${props => props.theme.input.color[props.styleType] || props.theme.input.color.default};
  border-width: 1px;
  border-style: solid;
  border-radius: ${props => props.theme.input.borderRadius};
  text-overflow: ellipsis !important;
  overflow: hidden;
  width: 100%;
  text-align: ${ props => props.styleAlign };
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    padding: ${props => mixins.getComponentPaddingForStyleSize('small', 'input', props) };
  }
}

`;

export const InputContainerInnerStyle = styled.div.attrs({className: 'InputContainerInnerStyle'})`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  ${props => {
    if (props.incrementable) {
      const buttonSpacing = '0 0.5em';
      const firstLastFlex = (props.block) ? `` : ``;
      const secondChild = (props.block) ? `
        &:nth-child(2) {
          flex: 100%;
        }
      ` : '';
      return `
        > div {
          &:first-child, &:last-child {
            padding: ${buttonSpacing};
            ${firstLastFlex}
          }
          ${secondChild}
          &:first-child{
            padding-left: 0;
          }
          &:last-child{
            padding-right: 0;
          }
        }
      `;
    }
  }}
`;

export const InputContainerStyle = styled(FormComponentStyle).attrs({className: 'InputContainerStyle'})`
  ${ HelpTextStyle }, ${ HelpTextAnimatedStyle } {
      padding: ${ props => mixins.getComponentPaddingForStyleSize(props.styleSize, 'input', props) };
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      &.entered, &.entering, &.show {
        padding-top: 0.6rem !important;
      }
      @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
        padding: ${props => mixins.getComponentPaddingForStyleSize('small', 'input', props) };
      }
  }
`;


export const InputFieldLabelContainerStyle = styled.div.attrs({className: 'InputFieldLabelContainerStyle'})`
  font-family: ${props => props.theme.inputPlaceholder.fontFamily.default};
  font-size: ${props => props.theme.input.fontSize[props.styleSize]};
  font-weight: ${props => props.theme.input.fontWeight.default};
  line-height: 1.4em;
  color: ${props => {
    let color = props.theme.inputPlaceholder.color.default;
    props.focused && (color = props.theme.inputPlaceholder.color.focused);
    props.error && (color = props.theme.inputPlaceholder.color.error);
    return color;
    }
  };
  ${IconStyle} {
    margin-right: 0.5em;
  }
  ${ props => {
    return getIconInComponentCSS('input', props);
  } };
`;
