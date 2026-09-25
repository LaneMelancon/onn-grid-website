import { HelpCircleIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { headerField, sectionGroups, sectionSettingsFields } from './shared';

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  groups: sectionGroups,
  fields: [
    headerField,
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'callout',
      title: 'Call to action column',
      type: 'object',
      group: 'content',
      description: 'Optional. Shown beside the questions.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'body', type: 'text', rows: 3 }),
        defineField({ name: 'action', type: 'cta' }),
      ],
    }),
    defineField({
      name: 'footnote',
      type: 'richText',
      group: 'content',
      description: 'Optional line below the questions, e.g. "Still have questions? Contact us".',
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading' },
    prepare: ({ title }) => ({ title: title || 'FAQ', subtitle: 'FAQ' }),
  },
});
