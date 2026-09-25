import { defineField, defineType } from 'sanity';
import { alignOptions } from '../options';

export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Header',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'body', type: 'text', rows: 3 }),
    defineField({
      name: 'align',
      type: 'string',
      initialValue: 'left',
      options: { list: alignOptions, layout: 'radio', direction: 'horizontal' },
    }),
  ],
});
