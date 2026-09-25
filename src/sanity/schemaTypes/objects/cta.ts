import { LaunchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { buttonVariantOptions } from '../options';

export const cta = defineType({
  name: 'cta',
  title: 'Button',
  type: 'object',
  icon: LaunchIcon,
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
    defineField({
      name: 'variant',
      type: 'string',
      initialValue: 'primary',
      options: { list: buttonVariantOptions },
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'variant' },
  },
});
