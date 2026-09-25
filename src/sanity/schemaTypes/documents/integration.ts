import { PlugIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const integration = defineType({
  name: 'integration',
  title: 'Integration',
  type: 'document',
  icon: PlugIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'logo', type: 'imageWithAlt' }),
    defineField({ name: 'url', title: 'Website', type: 'url' }),
    defineField({
      name: 'row',
      type: 'number',
      description: 'Which marquee row this logo appears in.',
      initialValue: 1,
      options: { list: [1, 2, 3], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({ name: 'order', type: 'number' }),
  ],
  orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'logo', row: 'row' },
    prepare: ({ title, media, row }) => ({ title, media, subtitle: row ? `Row ${row}` : undefined }),
  },
});
