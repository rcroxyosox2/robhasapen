import styled, { css } from 'styled-components';
import mixins from '../../Themes/mixins';

const flexCSS = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${(props) => mixins.styleAlignToFlexAlign(props.styleAlign)};
  align-items: center;
  gap: ${
    /* NOTE: not supported by ie 11 */
    props => props.theme.container.gap[props.styleGapSize || 'default']
  };
  > * {
    flex: 1;
  }
  @media (max-width: ${props => props.theme.responsive.largestMobileScreen}) {
    justify-content: ${(props) => mixins.styleAlignToFlexAlign(props.styleAlignMobile)};
  }
`;

const mobileCollapseCSS = css`
  @media (max-width: ${props => props.theme.responsive.largestMobileScreen}) {
    max-width: none;
    padding: 0;
    // Dont collapse inner containers
    & & {
      padding: 0 ${ props => props.theme.container.gutter[props.styleGutterSize || 'default'] } !important;
    }
  }
`;

const flexCSSToMobileColumn = css`
  ${flexCSS}
  @media (max-width: ${props => props.theme.responsive.largestMobileScreen}) {
    flex-flow: column nowrap;
    align-items: center;
    > * {
      box-sizing: border-box;
      width: 100%;
      flex: auto;
    }
  }
`;

export const ContainerStyle = styled.div.attrs({className: 'ContainerStyle'})`
  max-width: ${ props => props.theme.container.width[props.styleSize] };
  margin: 0 auto;
  box-sizing: border-box;
  text-align: ${(props) => props.styleAlign || 'inherit'};
  @media (max-width: ${ props => {
    const [containerWidth, containerUnit] = mixins.extractValUnit(props.theme.container.width[props.styleSize] || props.theme.container.width.default);
    const [gutterWidth, gutterUnit] = mixins.extractValUnit(props.theme.container.gutter[props.styleGutterSize || 'default']);
    return `calc(${containerWidth-1}${containerUnit} + ${gutterWidth * 2}${gutterUnit})`;
  }}) {
    max-width: none;
    width: 100%;
    padding: 0 ${ props => props.theme.container.gutter[props.styleGutterSize || 'default'] };
    /*
      Containers inside containers will have no padding
      note that class name is needed here instead of props
      there seems to be a bug with styled componens where props
      arent properly passed when referencing self
    */
    & & {
      padding: 0;
    }
  }
  ${ props => {
    if (props.mobileColumn) {
      return flexCSSToMobileColumn;
    }

    if (props.flex) {
      return flexCSS;
    }
  }}

  ${ props => {
    if (props.mobileCollapse) {
      return mobileCollapseCSS;
    }
  }}

  @media (max-width: ${props => props.theme.responsive.largestMobileScreen}) {
    text-align: ${(props) => props.styleAlignMobile ? props.styleAlignMobile : props.styleAlign || 'inherit'};
  }
`;
