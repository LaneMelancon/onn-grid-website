import { CreditCardIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { actionsField, headerField, sectionGroups, sectionSettingsFields } from './shared';

export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'Pricing',
  type: 'object',
  icon: CreditCardIcon,
  groups: [...sectionGroups, { name: 'comparison', title: 'Comparison' }],
  fields: [
    headerField,
    defineField({
      name: 'plans',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'pricingPlan' }] }],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'customPlan',
      title: 'Custom plan card',
      type: 'object',
      group: 'content',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'body', type: 'text', rows: 2 }),
        defineField({ name: 'features', type: 'array', of: [{ type: 'checklistItem' }] }),
        defineField({ name: 'action', type: 'cta' }),
      ],
    }),
    actionsField,
    defineField({
      name: 'display',
      type: 'string',
      group: 'settings',
      initialValue: 'full',
      options: {
        list: [
          { title: 'Full cards', value: 'full' },
          { title: 'Compact cards', value: 'compact' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'showBillingToggle',
      title: 'Show monthly/yearly toggle',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'comparisonRows',
      type: 'array',
      group: 'comparison',
      of: [{ type: 'compareRow' }],
    }),
    ...sectionSettingsFields,
  ],
  preview: {
    select: { title: 'header.heading', display: 'display' },
    prepare: ({ title, display }) => ({
      title: title || 'Pricing',
      subtitle: `Pricing · ${display ?? 'full'}`,
    }),
  },
});
