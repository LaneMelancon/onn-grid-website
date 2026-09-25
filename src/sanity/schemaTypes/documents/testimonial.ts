import { CommentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'avatar', type: 'imageWithAlt' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'avatar' },
  },
});
