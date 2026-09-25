import { SparklesIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { defineSlugField, documentGroups, seoField } from './shared';

export const websiteFeature = defineType({
  name: 'websiteFeature',
  title: 'Website feature',
  type: 'document',
  icon: SparklesIcon,
  groups: documentGroups,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineSlugField(),
    defineField({ name: 'eyebrow', type: 'string', group: 'content' }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Used in the page hero and on feature cards.',
    }),
    defineField({ name: 'icon', type: 'imageWithAlt', group: 'content' }),
    defineField({ name: 'image', title: 'Card image', type: 'imageWithAlt', group: 'content' }),
    defineField({ name: 'overviewHeading', type: 'string', group: 'content' }),
    defineField({ name: 'intro', type: 'richText', group: 'content' }),
    defineField({
      name: 'body',
      type: 'richText',
      group: 'content',
      description: 'Headings in the body build the table of contents.',
    }),
    defineField({ name: 'order', type: 'number', group: 'content' }),
    seoField,
  ],
  orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'eyebrow', media: 'icon' },
  },
});
