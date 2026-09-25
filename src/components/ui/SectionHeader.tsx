import { Text, Title, type TitleOrder } from '@mantine/core';
import clsx from 'clsx';
import { stegaClean } from 'next-sanity';
import { Eyebrow } from './Eyebrow';
import classes from './SectionHeader.module.css';

type SectionHeaderProps = {
  eyebrow?: string | null;
  heading?: string | null;
  body?: string | null;
  align?: 'left' | 'center' | null;
  headingOrder?: TitleOrder;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  body,
  align,
  headingOrder = 2,
  className,
}: SectionHeaderProps) {
  if (!eyebrow && !heading && !body) return null;

  return (
    <header className={clsx(classes.root, className)} data-align={stegaClean(align) ?? 'left'}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {heading && <Title order={headingOrder}>{heading}</Title>}
      {body && (
        <Text size="lg" className={classes.body}>
          {body}
        </Text>
      )}
    </header>
  );
}
