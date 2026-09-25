import { BulbOutlineIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { actionsField, sectionGroups, sectionSettingsFields } from './shared';

export const calloutSection = defineType({
  name: 'calloutSection',
  title: 'Callout',
  type: 'object',
  icon: BulbOutlineIcon,
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      group: 'settings',
      initialValue: 'banner',
      options: {
        list: [
          { title: 'Banner', value: 'banner' },
          { title: 'Statement', value: 'statement' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({ name: 'eyebrow', type: 'string', group: 'content' }),
    defineField({ name: 'heading', type: 'string', group: 'content' }),
    defineField({ name: 'body', type: 'text', rows: 3, group: 'content' }),
    defineField({
      name: 'checklist',
      type: 'array',
      group: 'content',
      of: [{ type: 'checklistItem' }],
    }),
    actionsField,
    defineField({ name: 'media', type: 'media', group: 'content' }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'heading', variant: 'variant' },
    prepare: ({ title, variant }) => ({
      title: title || 'Callout',
      subtitle: `Callout · ${variant ?? 'banner'}`,
    }),
  },
});
