import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const sectionReference = defineType({
  name: 'sectionReference',
  title: 'Shared section',
  type: 'object',
  icon: LinkIcon,
  description: 'Reuse a section that is edited once in "Shared sections".',
  fields: [
    defineField({
      name: 'sharedSection',
      type: 'reference',
      to: [{ type: 'sharedSection' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'sharedSection.title' },
    prepare: ({ title }) => ({ title: title || 'Shared section', subtitle: 'Shared section' }),
  },
});
