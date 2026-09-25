import { OlistIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const step = defineType({
  name: 'step',
  title: 'Step',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', type: 'text', rows: 4 }),
    defineField({
      name: 'actions',
      type: 'array',
      of: [{ type: 'cta' }],
      validation: (rule) => rule.max(2),
    }),
  ],
});
