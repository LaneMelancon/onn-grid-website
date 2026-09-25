import { CheckmarkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const checklistItem = defineType({
  name: 'checklistItem',
  title: 'Checklist item',
  type: 'object',
  icon: CheckmarkIcon,
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'included',
      type: 'boolean',
      description: 'Turn off to show the item as not included (dimmed).',
      initialValue: true,
    }),
    defineField({
      name: 'note',
      type: 'string',
      description: 'Optional short note, e.g. "Add-on".',
    }),
  ],
  preview: {
    select: { title: 'text', included: 'included', note: 'note' },
    prepare: ({ title, included, note }) => ({
      title,
      subtitle: [included === false ? 'Not included' : null, note].filter(Boolean).join(' · '),
    }),
  },
});
