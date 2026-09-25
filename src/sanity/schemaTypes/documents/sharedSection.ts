import { LinkIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { contentSectionTypes } from '../sections';

export const sharedSection = defineType({
  name: 'sharedSection',
  title: 'Shared section',
  type: 'document',
  icon: LinkIcon,
  description: 'A section edited once and reused on any page through "Shared section".',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'section',
      type: 'array',
      of: contentSectionTypes.map((section) => defineArrayMember({ type: section.name })),
      validation: (rule) => rule.required().length(1),
    }),
  ],
  preview: {
    select: { title: 'title', type: 'section.0._type' },
    prepare: ({ title, type }) => ({ title, subtitle: type }),
  },
});
