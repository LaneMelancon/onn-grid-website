import { CaseIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { sectionsField } from '../sections';
import { defineSlugField, documentGroups, seoField } from './shared';

export const work = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  icon: CaseIcon,
  groups: documentGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Project name',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineSlugField(),
    defineField({ name: 'summary', type: 'text', rows: 3, group: 'content' }),
    defineField({
      name: 'thumbnail',
      type: 'imageWithAlt',
      group: 'content',
      description: 'Used on project cards.',
    }),
    defineField({ name: 'heroImage', type: 'imageWithAlt', group: 'content' }),
    defineField({
      name: 'services',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'websiteUrl', title: 'Live website URL', type: 'url', group: 'content' }),
    defineField({ name: 'websiteLabel', title: 'Live website label', type: 'string', group: 'content' }),
    defineField({
      name: 'tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    sectionsField,
    seoField,
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'thumbnail', featured: 'featured' },
    prepare: ({ title, media, featured }) => ({
      title,
      media,
      subtitle: featured ? 'Featured' : undefined,
    }),
  },
});
