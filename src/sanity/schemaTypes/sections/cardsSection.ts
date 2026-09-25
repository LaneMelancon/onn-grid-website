import { BlockElementIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { actionsField, headerField, sectionGroups, sectionSettingsFields } from './shared';

const documentSources = ['work', 'websiteFeature', 'integration', 'testimonial'] as const;

type CardSource = 'manual' | (typeof documentSources)[number];

function sourceOf(parent: unknown): CardSource | undefined {
  return (parent as { source?: CardSource } | undefined)?.source;
}

function selectionOf(parent: unknown): 'all' | 'selected' | undefined {
  return (parent as { selection?: 'all' | 'selected' } | undefined)?.selection;
}

export const cardsSection = defineType({
  name: 'cardsSection',
  title: 'Cards',
  type: 'object',
  icon: BlockElementIcon,
  groups: sectionGroups,
  fields: [
    headerField,
    defineField({
      name: 'source',
      title: 'Cards come from',
      type: 'string',
      group: 'content',
      initialValue: 'manual',
      options: {
        list: [
          { title: 'Written here', value: 'manual' },
          { title: 'Work', value: 'work' },
          { title: 'Website features', value: 'websiteFeature' },
          { title: 'Integrations', value: 'integration' },
          { title: 'Testimonials', value: 'testimonial' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cards',
      type: 'array',
      group: 'content',
      of: [{ type: 'card' }],
      hidden: ({ parent }) => sourceOf(parent) !== 'manual',
    }),
    defineField({
      name: 'selection',
      type: 'string',
      group: 'content',
      initialValue: 'all',
      options: {
        list: [
          { title: 'All documents', value: 'all' },
          { title: 'Hand-picked', value: 'selected' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      hidden: ({ parent }) => sourceOf(parent) === 'manual',
    }),
    defineField({
      name: 'documents',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: documentSources.map((type) => ({ type })) }],
      hidden: ({ parent }) =>
        sourceOf(parent) === 'manual' || selectionOf(parent) !== 'selected',
    }),
    defineField({
      name: 'limit',
      type: 'number',
      group: 'content',
      description: 'Optional. Maximum number of cards to show.',
      hidden: ({ parent }) => sourceOf(parent) === 'manual',
      validation: (rule) => rule.integer().positive(),
    }),
    actionsField,
    defineField({
      name: 'layout',
      type: 'string',
      group: 'settings',
      initialValue: 'grid',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Marquee', value: 'marquee' },
          { title: 'List', value: 'list' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'columns',
      type: 'number',
      group: 'settings',
      initialValue: 3,
      options: { list: [2, 3, 4], layout: 'radio', direction: 'horizontal' },
      hidden: ({ parent }) => (parent as { layout?: string } | undefined)?.layout !== 'grid',
    }),
    defineField({
      name: 'cardStyle',
      type: 'string',
      group: 'settings',
      initialValue: 'outline',
      options: {
        list: [
          { title: 'Outline', value: 'outline' },
          { title: 'Elevated', value: 'elevated' },
          { title: 'Subtle', value: 'subtle' },
          { title: 'Plain', value: 'plain' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading', source: 'source', layout: 'layout' },
    prepare: ({ title, source, layout }) => ({
      title: title || 'Cards',
      subtitle: `Cards · ${source ?? 'manual'} · ${layout ?? 'grid'}`,
    }),
  },
});
