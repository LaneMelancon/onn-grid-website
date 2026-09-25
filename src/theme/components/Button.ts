import { Button } from '@mantine/core';
import classes from './Button.module.css';

export const ButtonExtension = Button.extend({
  defaultProps: {
    variant: 'primary',
    radius: 'pill',
  },
  classNames: classes,
});
