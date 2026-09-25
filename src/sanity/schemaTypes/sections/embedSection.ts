import { CodeBlockIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { headerField, sectionGroups, sectionSettingsFields } from './shared';

export const embedSection = defineType({
  name: 'embedSection',
  title: 'Embed',
  type: 'object',
  icon: CodeBlockIcon,
  groups: sectionGroups,
  fields: [
    headerField,
    defineField({
      name: 'provider',
      type: 'string',
      group: 'content',
      initialValue: 'calendly',
      options: { list: [{ title: 'Calendly', value: 'calendly' }] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      group: 'content',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'height',
      type: 'number',
      group: 'settings',
      description: 'Height in pixels.',
      initialValue: 630,
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading', provider: 'provider' },
    prepare: ({ title, provider }) => ({
      title: title || 'Embed',
      subtitle: `Embed · ${provider}`,
    }),
  },
});
