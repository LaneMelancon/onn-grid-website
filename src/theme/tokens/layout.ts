import type { MantineThemeOverride } from '@mantine/core';

export const containerSizes = {
  xs: '36rem',
  sm: '48rem',
  md: '64rem',
  lg: '75rem',
  xl: '90rem',
} as const;

export const layout = {
  spacing: {
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2.5rem',
    xxl: '5rem',
  },
  radius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '2rem',
    pill: '9999px',
  },
  defaultRadius: 'lg',
  shadows: {
    xs: '0 2px 12px 1px rgb(18 23 34 / 5%)',
    sm: '0 4px 18px 3px rgb(18 23 34 / 4%)',
    md: '0 3px 18px 3px rgb(18 23 34 / 10%)',
    lg: '0 6px 24px 2px rgb(18 23 34 / 8%)',
    xl: '0 3px 13px 2px rgb(18 23 34 / 20%)',
  },
} satisfies MantineThemeOverride;
