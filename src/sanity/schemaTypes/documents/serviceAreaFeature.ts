import { PinIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { defineSlugField, documentGroups, seoField } from './shared';

export const serviceAreaFeature = defineType({
  name: 'serviceAreaFeature',
  title: 'Service area feature',
  type: 'document',
  icon: PinIcon,
  groups: documentGroups,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineSlugField(),
    defineField({
      name: 'serviceArea',
      type: 'reference',
      group: 'content',
      to: [{ type: 'serviceArea' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'websiteFeature',
      type: 'reference',
      group: 'content',
      to: [{ type: 'websiteFeature' }],
    }),
    defineField({ name: 'eyebrow', type: 'string', group: 'content' }),
    defineField({ name: 'summary', type: 'text', rows: 3, group: 'content' }),
    defineField({ name: 'image', type: 'imageWithAlt', group: 'content' }),
    defineField({ name: 'intro', type: 'richText', group: 'content' }),
    defineField({ name: 'body', type: 'richText', group: 'content' }),
    seoField,
  ],
  preview: {
    select: { title: 'title', area: 'serviceArea.title' },
    prepare: ({ title, area }) => ({ title, subtitle: area }),
  },
});
