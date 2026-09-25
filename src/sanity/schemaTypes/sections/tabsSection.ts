import { ThLargeIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { headerField, sectionGroups, sectionSettingsFields } from './shared';

export const tabsSection = defineType({
  name: 'tabsSection',
  title: 'Tabs',
  type: 'object',
  icon: ThLargeIcon,
  groups: sectionGroups,
  fields: [
    headerField,
    defineField({
      name: 'tabs',
      type: 'array',
      group: 'content',
      validation: (rule) => rule.required().min(2),
      of: [
        defineArrayMember({
          name: 'tab',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'eyebrow', type: 'string' }),
            defineField({ name: 'heading', type: 'string' }),
            defineField({ name: 'body', type: 'text', rows: 3 }),
            defineField({ name: 'cards', type: 'array', of: [{ type: 'card' }] }),
            defineField({ name: 'media', type: 'media' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'heading' },
          },
        }),
      ],
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading' },
    prepare: ({ title }) => ({ title: title || 'Tabs', subtitle: 'Tabs' }),
  },
});
