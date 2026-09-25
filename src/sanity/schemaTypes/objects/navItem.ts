import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label' },
  },
});
