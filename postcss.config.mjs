import { readFileSync } from 'node:fs';

const breakpoints = JSON.parse(
  readFileSync(new URL('./src/theme/breakpoints.json', import.meta.url), 'utf8'),
);

const breakpointVariables = Object.fromEntries(
  Object.entries(breakpoints).map(([name, value]) => [`mantine-breakpoint-${name}`, value]),
);

const config = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': { variables: breakpointVariables },
  },
};

export default config;
