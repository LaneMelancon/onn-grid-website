import { defineField, type FieldGroupDefinition } from 'sanity';
import { spacingOptions, toneOptions } from '../options';

export const sectionGroups: FieldGroupDefinition[] = [
  { name: 'content', title: 'Content', default: true },
  { name: 'settings', title: 'Settings' },
];

/** Presentation settings every section shares. Spread these at the end of a section's fields. */
export const sectionSettingsFields = [
  defineField({
    name: 'tone',
    type: 'string',
    group: 'settings',
    initialValue: 'light',
    options: { list: toneOptions, layout: 'radio', direction: 'horizontal' },
  }),
  defineField({
    name: 'spacing',
    title: 'Vertical spacing',
    type: 'string',
    group: 'settings',
    initialValue: 'lg',
    options: { list: spacingOptions, layout: 'radio', direction: 'horizontal' },
  }),
  defineField({
    name: 'anchorId',
    title: 'Anchor ID',
    type: 'string',
    group: 'settings',
    description: 'Optional. Lets links jump to this section, e.g. "pricing".',
    validation: (rule) =>
      rule.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { name: 'lowercase-with-dashes' }),
  }),
];

export const headerField = defineField({
  name: 'header',
  type: 'sectionHeader',
  group: 'content',
});

export const actionsField = defineField({
  name: 'actions',
  type: 'array',
  group: 'content',
  of: [{ type: 'cta' }],
  validation: (rule) => rule.max(3),
});
