import { TextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { headerField, sectionGroups, sectionSettingsFields } from './shared';

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich text',
  type: 'object',
  icon: TextIcon,
  groups: sectionGroups,
  fields: [
    headerField,
    defineField({
      name: 'content',
      type: 'richText',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading' },
    prepare: ({ title }) => ({ title: title || 'Rich text', subtitle: 'Rich text' }),
  },
});
