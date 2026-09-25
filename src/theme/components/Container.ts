import { Container, rem } from '@mantine/core';
import { containerSizes } from '../tokens/layout';
import classes from './Container.module.css';

function isContainerSize(size: unknown): size is keyof typeof containerSizes {
  return typeof size === 'string' && size in containerSizes;
}

export const ContainerExtension = Container.extend({
  defaultProps: {
    size: 'lg',
  },
  classNames: classes,
  vars: (_, { size, fluid }) => ({
    root: {
      '--container-size': fluid
        ? '100%'
        : isContainerSize(size)
          ? containerSizes[size]
          : rem(size),
    },
  }),
});
