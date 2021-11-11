import { createGlobalStyle } from 'styled-components';
import { importFontFamilyLocal, appearance } from './mixins';

const ResetStyle = createGlobalStyle`
  :root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-weight: 400;
    color: ${props => props.theme.globals.baseFontColor };
    font-family: ${props => props.theme.globals.baseFontFamily };
    font-size: ${props => props.theme.globals.baseFontSize.default };
  }
  @-moz-document url-prefix() {
    body {
      font-weight: lighter !important;
    }
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
  data {
    font-weight: bold;
  }
  button {
    ${appearance()};
    font-family: inherit;
    cursor: pointer;
  }
  input {
    ${appearance()};
    font-family: inherit;
  }
  _:-ms-fullscreen, :root body {
    height: 100vh;
  }
  a{
    ${ props => props.theme.globals.linkCSS};
  }
  p {
    line-height: ${ props => props.theme.globals.baseFontLineHeight.default };
    margin: 0 0 1.5em;
  }
  h1, h2, h3 {
    text-transform: uppercase;
  }
  h1, h2, h3, h4 {
    font-weight: normal;
    font-size: inherit;
    margin: 0;
  }
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
  // use Accesibility/FocusVisible for outlines
  :focus {
    outline: none;
    &::-moz-focus-inner {
      border: 0;
    }
  }
`;

export default ResetStyle;