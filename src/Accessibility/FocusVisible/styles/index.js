import { createGlobalStyle } from 'styled-components';

export const FocusVisibleStyle = createGlobalStyle`
  .js-focus-visible & {
    [data-focus-visible-added] {
      ${ props => props.theme.globals.accesibilityFocusedOutlineCSS }
    }

    /* Inputs are responsible for handling their outlines */
    :focus:not([data-focus-visible-added]), input:focus, textarea:focus {
      outline: none !important;
    }
  }
`;
