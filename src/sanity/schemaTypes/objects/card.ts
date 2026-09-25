import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const card = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({ name: 'icon', type: 'imageWithAlt' }),
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', type: 'text', rows: 3 }),
    defineField({ name: 'action', type: 'cta' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'eyebrow', media: 'icon' },
  },
});
