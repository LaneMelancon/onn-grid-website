import { Tabs } from '@mantine/core';
import classes from './Tabs.module.css';

export const TabsExtension = Tabs.extend({
  defaultProps: {
    variant: 'pills',
    radius: 'pill',
  },
  classNames: classes,
});
