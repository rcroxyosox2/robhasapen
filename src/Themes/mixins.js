import { css, createGlobalStyle } from 'styled-components';
import { lighten, darken } from 'polished';

export const importFontFamily = (fontPath, fontFile, fontName) => {
  return `
    @font-face {
      font-family: '${fontName}';
      src: url('${fontPath}/${fontFile}.eot');
      src: url('${fontPath}/${fontFile}.eot?#iefix') format('embedded-opentype'),
            url('${fontPath}/${fontFile}.woff2') format('woff2'),
            url('${fontPath}/${fontFile}.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
  `
};

export const importFontFamilyLocal = ({name, weight = 'normal', style = 'normal'}, woff2, woff) => {
  return `
    @font-face {
      font-family: '${name}';
      src: local('${name}'), url(${woff2}) format('woff2'),
          local('${name}'), url(${woff}) format('woff');
      font-weight: ${weight};
      font-style: ${style};
    }
  `
};

const BodyFixedStyle = css`
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

export const BodyForFixedStyle = createGlobalStyle`
  ${
    props => {
      if (!props.onlyMobileFixed) {
        return BodyFixedStyle;
      }
    }
  }

  @media only screen and (max-width: ${ props => props.theme.responsive.largestMobileScreen }) {
    ${
      props => {
        if (props.onlyMobileFixed) {
          return BodyFixedStyle;
        }
      }
    }
    html, #root {
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
    }
  }
`;

export const appearance = (val = 'none') => {
  return css`
    appearance: ${val};
    -ms-appearance: ${val};
    -webkit-appearance: ${val};
    -moz-appearance: ${val};
    border: none;
    background: none;
    padding: 0;
    margin: 0;
  `;
};

export const pointerHoverCondition = (andCond = '') => css`@media (hover: hover) and (pointer: fine) ${ andCond }, (-ms-high-contrast: none), (-ms-high-contrast: active)`;

export const ieOnly = (ieStyles = '') => {
  return css`
    @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
      ${ieStyles}
    }
  `;
};

export const edgeOnly = (edgeStyles = '') => {
  return css`
    @supports (-ms-ime-align: auto) {
      ${edgeStyles}
    }
  `;
}

export const ieAndEdgeOnly = (ieAndEdgeStyles = '') => {
  return css`
    ${edgeOnly(ieAndEdgeStyles)}
    ${ieOnly(ieAndEdgeStyles)}
  `;
};

//hover only on devices with hover
export const hover = (cssStr, hoverAnd = '') => {
  return css`
    ${pointerHoverCondition(hoverAnd)} {
      &:hover {
        ${cssStr}
      }
    }
  `;
};


/**
 * takes in a css unit as a string such as "234px" or "2.4rem"
 * and returns and array [234.0, 'px'] or [2.4, 'rem'] respectively
 * passing "0" or null will return [0.0, "px"] and 23 will return [23.0, "px"]
 * @param {(string|number)} val
 * @returns {[number, string]}
 */
export function extractValUnit(val = 0) {
  return `${val}`.match(/^([\d.?]*)([a-z]*)$/).slice(1).map((v, i) => (i === 0) ? (parseFloat(v) || 0) : (v || 'px'));
}

export function getRemFromPx(sizeInPx, basisInPx) {
  return `${parseInt(sizeInPx) / parseInt(basisInPx, 10)}rem`;
}

export function hexToRGB(col) {
  col = col.replace(/#/g, '');
  col = (col.length < 6) ? Array((6-col.length)).join(col) : col;

  var r = parseInt(col.substring(0, 2), 16) || 0;
  var g = parseInt(col.substring(2, 4), 16) || 0;
  var b = parseInt(col.substring(4, 6), 16) || 0;
  return [r,g,b];
}

export function lightenDarkenColor(color, percent) {

  if (percent > 0) {
    return lighten(percent, color);
  } else {
    return darken(Math.abs(percent), color);
  }

}

export const rgba = function(hex, amount) {
  return `rgba(${hexToRGB(hex).toString()}, ${amount})`;
};

export const font = (name, file) => ({name, file});

export const styleAlignToFlexAlign = (styleAlign) => {
  switch (styleAlign) {
    case 'left':
    return 'flex-start';
    case 'right':
    return 'flex-end';
    default:
    return 'center';
  }
};

// For inputs and buttons
export const getComponentPaddingForStyleSize = (styleSize, component, props) => {

  const themeComponent = props.theme[component];
  if (!themeComponent) {
    throw new Error(`No component found in theme with the name '${component}'`);
  }

  let padding = themeComponent.padding[styleSize];
  const paddingLeftRight = padding.leftRight;
  const iconSize = themeComponent.iconSize[styleSize];
  const lrPaddingCalc = `calc(${paddingLeftRight} + ${iconSize + (iconSize/2)}px)`;
  let paddingLeft = (props.iconType && props.iconStyleAlign === 'left') ? lrPaddingCalc : paddingLeftRight;
  let paddingRight = (props.iconType && props.iconStyleAlign === 'right') ? lrPaddingCalc : paddingLeftRight;

  return `${padding.topBottom} ${paddingRight} ${padding.topBottom} ${paddingLeft}`;
};

export const getComponentPaddingForStyleSizeArr = (styleSize, component, props) => {
  return getComponentPaddingForStyleSize(styleSize, component, props).split(' ');
}

export const getBackgroundColor = (component, props) => {

  const themeComponent = props.theme[component];

  if (!themeComponent) {
    throw new Error(`No component found in theme with the name '${component}'`);
  }

  let backgroundColor = themeComponent.backgroundColor[props.styleType];

  if (props.active) {
    backgroundColor = themeComponent.backgroundColor.active;
  }

  if (props.error) {
    backgroundColor = themeComponent.backgroundColor.error;
  }

  return backgroundColor;
};

export const getBorderColor = (component, props) => {

  const themeComponent = props.theme[component];

  if (!themeComponent) {
    throw new Error(`No component found in theme with the name '${component}'`);
  }

  let borderColor = themeComponent.borderColor[props.styleType] || themeComponent.borderColor.default;

  if (props.active) {
    borderColor = themeComponent.borderColor.active[props.styleType] || themeComponent.borderColor.active.default;
  }

  if (props.error) {
    borderColor = themeComponent.borderColor.error;
  }

  if (props.focused) {
    borderColor = (props.error)
      ? themeComponent.borderColor.focused.error || themeComponent.borderColor.focused.default
      : themeComponent.borderColor.focused[props.styleType] || themeComponent.borderColor.focused.default;
  }

  if (props.borderless) {
    borderColor = 'transparent';
  }

  return borderColor;
};

export default {
  getComponentPaddingForStyleSize,
  getComponentPaddingForStyleSizeArr,
  getBackgroundColor,
  getBorderColor,
  pointerHoverCondition,
  BodyForFixedStyle,
  hover,
  ieOnly,
  edgeOnly,
  ieAndEdgeOnly,
  getRemFromPx,
  appearance,
  extractValUnit,
  rgba,
  hexToRGB,
  lightenDarkenColor,
  importFontFamily,
  styleAlignToFlexAlign,
  font
};
