import React from 'react';
import * as polished from 'polished';

import {
  render,
  userEvent,
  screen,
  within,
} from 'testHelpers';

import {
  Accessibility,
  Themes,
} from '../../';

describe('FocusVisible', () => {
  it('can render and focus with an outline', () => {
    const theme = Themes.main;
    render(
      <>
        <Accessibility.FocusVisible />
        <button>Hello</button>
      </>
    , { theme });
    userEvent.tab();
    const button = screen.getByRole('button', {
      name: /Hello/i
    })
    const outlineColor = window.getComputedStyle(button, null).outlineColor;
    expect(polished.parseToRgb(outlineColor)).toStrictEqual(polished.parseToRgb(theme.colors.yorange));
  });
})
