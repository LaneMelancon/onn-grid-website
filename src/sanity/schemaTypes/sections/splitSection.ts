import { SplitHorizontalIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { actionsField, sectionGroups, sectionSettingsFields } from './shared';

export const splitSection = defineType({
  name: 'splitSection',
  title: 'Text + media',
  type: 'object',
  icon: SplitHorizontalIcon,
  groups: sectionGroups,
  fields: [
    defineField({ name: 'eyebrow', type: 'string', group: 'content' }),
    defineField({ name: 'heading', type: 'string', group: 'content' }),
    defineField({ name: 'body', type: 'richText', group: 'content' }),
    defineField({
      name: 'checklist',
      type: 'array',
      group: 'content',
      of: [{ type: 'checklistItem' }],
    }),
    actionsField,
    defineField({
      name: 'media',
      type: 'array',
      group: 'content',
      description: 'One item, or up to three for a gallery.',
      of: [{ type: 'media' }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'mediaPosition',
      type: 'string',
      group: 'settings',
      initialValue: 'right',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'heading', subtitle: 'eyebrow' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Text + media',
      subtitle: subtitle ? `Text + media · ${subtitle}` : 'Text + media',
    }),
  },
});
