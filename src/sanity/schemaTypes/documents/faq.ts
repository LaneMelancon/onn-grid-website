import { HelpCircleIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'richText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'question' },
  },
});
