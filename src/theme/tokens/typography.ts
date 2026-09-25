import type { MantineThemeOverride } from '@mantine/core';

// Font stacks resolve to the CSS variables that next/font sets on <html> (see ../fonts.ts).
const textFont = 'var(--ds-font-text), system-ui, sans-serif';
const displayFont = 'var(--ds-font-display), system-ui, sans-serif';

/*
 * Fluid sizes interpolate between a 480px and a 1440px viewport.
 * Root font size stays at 16px so rem values match what the browser (and the user) expect.
 */
export const typography = {
  fontFamily: textFont,
  headings: {
    fontFamily: displayFont,
    fontWeight: '600',
    textWrap: 'balance',
    sizes: {
      h1: { fontSize: 'clamp(2.65rem, 1.6rem + 3.5vw, 4.75rem)', lineHeight: '1.125' },
      h2: { fontSize: 'clamp(2rem, 1.5rem + 1.667vw, 3rem)', lineHeight: '1.2' },
      h3: { fontSize: '1.5rem', lineHeight: '1.3' },
      h4: { fontSize: '1.25rem', lineHeight: '1.35' },
      h5: { fontSize: '1.125rem', lineHeight: '1.4' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
    },
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.5',
    md: '1.7',
    lg: '1.7',
    xl: '1.7',
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} satisfies MantineThemeOverride;
