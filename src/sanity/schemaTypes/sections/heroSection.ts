import { StarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { actionsField, sectionGroups, sectionSettingsFields } from './shared';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  icon: StarIcon,
  groups: sectionGroups,
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      group: 'settings',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Text', value: 'default' },
          { title: 'Text with media', value: 'media' },
          { title: 'Profile', value: 'profile' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'eyebrow', type: 'string', group: 'content' }),
    defineField({
      name: 'heading',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', type: 'text', rows: 3, group: 'content' }),
    actionsField,
    defineField({ name: 'media', type: 'media', group: 'content' }),
    defineField({
      name: 'showScrollIndicator',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'heading', subtitle: 'eyebrow' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Hero', subtitle: subtitle || 'Hero' }),
  },
});
