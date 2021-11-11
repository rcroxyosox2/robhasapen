
import mixins from './mixins';
import { css, keyframes } from  'styled-components';
import { darken } from 'polished';
const font = mixins.font;

const responsive = {
  mobileSmBreakpoint: '320px',
  mobileMidBreakpoint: '375px',
  mobileLrgBreakpoint: '414px',
  tabletBreakpoint: '768px',
  computerBreakpoint: '992px',
  largeMonitorBreakpoint: '1000px',
  widescreenMonitorBreakpoint: '192px'
};

responsive.largestMobileScreen = `${(parseInt(responsive.tabletBreakpoint, 10) - 1)}px`;
responsive.largestTabletScreen = `${(parseInt(responsive.computerBreakpoint, 10) - 1)}px`;
responsive.largestSmallMonitor = `${(parseInt(responsive.largeMonitorBreakpoint, 10) - 1)}px`;
responsive.largestLargeMonitor = `${(parseInt(responsive.widescreenMonitorBreakpoint, 10) - 1)}px`;


const animations = {};


const fonts = {
  default: font('courier'),
};

const colors = {
  clear: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF0000',
};

const linkHoverCSS = css`
  text-decoration: none;
  color: ${ props => props.theme.link.color.hover };
`;

const globals = {
  fonts: fonts,
  baseFontColor: colors.black,
  accesibilityFocusedOutlineCSS: css`
    outline-style: solid;
    outline-offset: 5px;
    outline-width: 3px;
    outline-color: ${ colors.black };
  `,
  linkCSS: css`
    -webkit-tap-highlight-color: transparent;
    white-space: nowrap;
    text-decoration: underline;
    color: ${ colors.black };
    cursor: pointer;
    ${mixins.hover(linkHoverCSS)}
  `,
  baseFontFamily: `${ fonts.default.name }`,
  baseFontSize: {
    default: '16px',
    largeMonitor: '18px',
    mobile: '18px',
    mini: '13px',
    micro: '11px'
  },
  baseFontLineHeight: {
    default: '1.5em'
  },
};

// TODO: integrate this into our container component
const container = {
  width: {
    tiny: '500px',
    small: '700px',
    medium: '912px',
    default: '1000px',
  },
  gutter: {
    default: '40px',
    medium: '50px',
  },
  gap: {
    default: '0',
    medium: '40px',
    large: '50px',
  }
};

const header = {
  fontFamily: {
    default: fonts.default.name,
  },
  fontWeight: {
    default: 'normal',
  },
  fontSize: {
    default: {
      default: mixins.getRemFromPx(21, globals.baseFontSize.default),
      mobile: mixins.getRemFromPx(18, globals.baseFontSize.default)
    },
  }
};


const input = {
  marginBottom: {
    default: '1.1em',
  },
  color: {
    default: colors.black,
  },
  fontFamily: {
    default: fonts.default.name
  },
  borderColor: {
    default: colors.black,
  },
  backgroundColor: {
    default: colors.white,
  },
  autoFill: {
    backgroundColor: {
      default: mixins.lightenDarkenColor(colors.black, 0.3),
    },
    borderColor: {
      default: mixins.lightenDarkenColor(colors.black, 0),
    }
  },
  padding: {
    default: {
      topBottom: '1.2em',
      leftRight: '2em'
    },
  },
  fontSize: {
    default: '1rem',
  },
};

const inputPlaceholder = {
  fontFamily: input.fontFamily,
  color: {
    default: colors.black,
    focused: colors.black,
    error: colors.red
  }
};

const textArea = {
  ...input,
  padding: {
    default: '1.2rem 1.5rem'
  },
};


const link = {
  color: {
    default: colors.black,
  },
};

link.color.hover = mixins.lightenDarkenColor(link.color.default, 0.30);

const button = {
  fontFamily: {
    default: fonts.default.name,
  },
  color: {
    default: colors.black,
  },
  backgroundColor: {
    default: colors.white,
  },
  padding: {
    default: '0 1.5em',
  },
  height: {
    default: '4.3em',
  },
  fontSize: {
    default: '1em',
  },
  border: {
    default: `1px solid ${colors.black}`,
  }
};



// Use minimal reset definitions. Defining them is somewhat of an anti-pattern to the styled components philosophy
// This is a mixin for this reason - to try and enforce limited reseting at the global level.
// Individual components are responsible for reseting themselves


export default {
  animations,
  button,
  link,
  colors,
  container,
  fonts,
  globals, // TODO: rename this to globals! JEST uses this word
  header,
  textArea,
  input,
  inputPlaceholder,
  responsive
};
