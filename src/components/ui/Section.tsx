import type { ComponentPropsWithoutRef } from 'react';
import { Container, type MantineSize } from '@mantine/core';
import clsx from 'clsx';
import { stegaClean } from 'next-sanity';
import classes from './Section.module.css';

export type SectionTone = 'light' | 'subtle' | 'dark' | 'brand';
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  tone?: SectionTone | null;
  spacing?: SectionSpacing | null;
  /** Content width. Use `false` when the children handle their own layout. */
  container?: MantineSize | false;
};

const darkTones = new Set<SectionTone>(['dark', 'brand']);

/**
 * The building block for every page section: background tone, vertical rhythm,
 * gutters, and content width. Tone also tells the navbar which logo to show.
 */
export function Section({
  tone,
  spacing,
  container = 'lg',
  className,
  children,
  ...props
}: SectionProps) {
  const resolvedTone = stegaClean(tone) ?? 'light';
  const resolvedSpacing = stegaClean(spacing) ?? 'lg';

  return (
    <section
      {...props}
      className={clsx(classes.root, className)}
      data-tone={resolvedTone}
      data-spacing={resolvedSpacing}
      data-nav-theme={darkTones.has(resolvedTone) ? 'dark' : 'light'}
    >
      {container ? <Container size={container}>{children}</Container> : children}
    </section>
  );
}
