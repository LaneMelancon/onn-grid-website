import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Shown in search results and browser tabs. Falls back to the document title.',
      validation: (rule) => rule.max(60).warning('Titles over 60 characters get truncated.'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning('Descriptions over 160 characters get truncated.'),
    }),
    defineField({
      name: 'image',
      title: 'Social share image',
      type: 'image',
      description: 'Recommended size: 1200 × 630.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
