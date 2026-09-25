import { EnvelopeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { headerField, sectionGroups, sectionSettingsFields } from './shared';

export const formSection = defineType({
  name: 'formSection',
  title: 'Form',
  type: 'object',
  icon: EnvelopeIcon,
  groups: sectionGroups,
  fields: [
    headerField,
    defineField({
      name: 'form',
      type: 'string',
      group: 'content',
      initialValue: 'contact',
      options: { list: [{ title: 'Contact', value: 'contact' }] },
      validation: (rule) => rule.required(),
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading', form: 'form' },
    prepare: ({ title, form }) => ({ title: title || 'Form', subtitle: `Form · ${form}` }),
  },
});
