import { Accordion } from '@mantine/core';
import classes from './Accordion.module.css';

export const AccordionExtension = Accordion.extend({
  defaultProps: {
    variant: 'separated',
    radius: 'md',
    chevronPosition: 'right',
  },
  classNames: classes,
});
