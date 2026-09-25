import { Text, type TextProps } from '@mantine/core';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import classes from './Eyebrow.module.css';

type EyebrowProps = TextProps & { children: ReactNode };

export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <Text component="p" size="sm" {...props} className={clsx(classes.root, className)}>
      {children}
    </Text>
  );
}
