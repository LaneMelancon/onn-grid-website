import { Text } from '@mantine/core';
import { Section, type SectionSpacing, type SectionTone } from '@/components/ui/Section';
import classes from './SectionPlaceholder.module.css';

type SectionPlaceholderProps = {
  type: string;
  tone?: SectionTone | null;
  spacing?: SectionSpacing | null;
};

/** Development-only stand-in for sections that don't have a component yet. */
export function SectionPlaceholder({ type, tone, spacing }: SectionPlaceholderProps) {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <Section tone={tone} spacing={spacing ?? 'sm'}>
      <div className={classes.root}>
        <Text size="sm">
          <strong>{type}</strong> has no component yet. Register one in
          components/sections/registry.ts.
        </Text>
      </div>
    </Section>
  );
}
