import { createTheme } from '@mantine/core';
import breakpoints from './breakpoints.json';
import { components } from './components';
import { black, colors, white } from './tokens/colors';
import { layout } from './tokens/layout';
import { typography } from './tokens/typography';

export const theme = createTheme({
  white,
  black,
  colors,
  primaryColor: 'brand',
  primaryShade: 6,
  breakpoints,
  ...typography,
  ...layout,
  cursorType: 'pointer',
  respectReducedMotion: true,
  components,
});
