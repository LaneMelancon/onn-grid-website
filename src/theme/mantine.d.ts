import type { DefaultMantineColor, MantineColorsTuple } from '@mantine/core';

type ThemeColor = 'brand' | 'accent' | 'tint' | 'ink' | DefaultMantineColor;
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ThemeColor, MantineColorsTuple>;
  }

  export interface MantineThemeSizesOverride {
    breakpoints: Record<Size, string>;
    fontSizes: Record<Size | 'xxl', string>;
    lineHeights: Record<Size, string>;
    fontWeights: Record<'regular' | 'medium' | 'semibold' | 'bold', string>;
    spacing: Record<'xxs' | Size | 'xxl', string>;
    radius: Record<Size | 'pill', string>;
    shadows: Record<Size, string>;
  }
}
