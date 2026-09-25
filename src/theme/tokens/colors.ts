import type { MantineColorsTuple } from '@mantine/core';

/*
 * Project palettes. Palette names describe a role, not a hue, so the rest of the
 * system (components, tokens.css) never needs to change between projects.
 * The comment on each palette marks which shade holds the original brand value.
 */

// #404eed at [6]
const brand: MantineColorsTuple = [
  '#ecedfe',
  '#d4d7fc',
  '#aeb4f9',
  '#8992f5',
  '#6974f2',
  '#525fef',
  '#404eed',
  '#2635d9',
  '#2430b2',
  '#1f288e',
];

// #64c1ff at [5]
const accent: MantineColorsTuple = [
  '#ebf7ff',
  '#d6efff',
  '#b8e2ff',
  '#99d6ff',
  '#80ccff',
  '#64c1ff',
  '#3db1ff',
  '#0a9dff',
  '#0081d6',
  '#0062a3',
];

// #c4c4e4 at [3]
const tint: MantineColorsTuple = [
  '#f5f5fa',
  '#e7e7f4',
  '#d5d5ec',
  '#c4c4e4',
  '#a4a4d5',
  '#8585c7',
  '#6565b8',
  '#4c4ca4',
  '#3d3d85',
  '#2f2f65',
];

// #242d40 at [6], #121722 at [9]
const ink: MantineColorsTuple = [
  '#e0e3ea',
  '#babfc8',
  '#959aa6',
  '#6f7684',
  '#535a6a',
  '#3b4354',
  '#242d40',
  '#1b2231',
  '#171d2b',
  '#121722',
];

// #fafafa at [0], #c6c6c6 at [3], #7c7c7c at [6]
const gray: MantineColorsTuple = [
  '#fafafa',
  '#f5f5f5',
  '#e0e0e0',
  '#c6c6c6',
  '#adadad',
  '#959595',
  '#7c7c7c',
  '#5c5e61',
  '#42444a',
  '#272b34',
];

export const colors = { brand, accent, tint, ink, gray };

export const white = '#ffffff';
export const black = ink[9];
