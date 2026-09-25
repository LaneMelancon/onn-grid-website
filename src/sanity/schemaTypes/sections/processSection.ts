import { OlistIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { actionsField, headerField, sectionGroups, sectionSettingsFields } from './shared';

export const processSection = defineType({
  name: 'processSection',
  title: 'Process',
  type: 'object',
  icon: OlistIcon,
  groups: sectionGroups,
  fields: [
    headerField,
    defineField({
      name: 'steps',
      type: 'array',
      group: 'content',
      of: [{ type: 'step' }],
      validation: (rule) => rule.required().min(1),
    }),
    actionsField,
    defineField({
      name: 'layout',
      type: 'string',
      group: 'settings',
      initialValue: 'numbered',
      options: {
        list: [
          { title: 'Numbered steps', value: 'numbered' },
          { title: 'Scroll progress', value: 'scroll' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'showScrollIndicator',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading', steps: 'steps' },
    prepare: ({ title, steps }) => ({
      title: title || 'Process',
      subtitle: `Process · ${Array.isArray(steps) ? steps.length : 0} steps`,
    }),
  },
});
