import { ImagesIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { headerField, sectionGroups, sectionSettingsFields } from './shared';

export const mediaSection = defineType({
  name: 'mediaSection',
  title: 'Media',
  type: 'object',
  icon: ImagesIcon,
  groups: sectionGroups,
  fields: [
    headerField,
    defineField({
      name: 'items',
      type: 'array',
      group: 'content',
      of: [{ type: 'media' }],
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: 'width',
      type: 'string',
      group: 'settings',
      initialValue: 'contained',
      options: {
        list: [
          { title: 'Contained', value: 'contained' },
          { title: 'Full width', value: 'full' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading', media: 'items.0.image' },
    prepare: ({ title, media }) => ({ title: title || 'Media', subtitle: 'Media', media }),
  },
});
