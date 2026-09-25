import { CreditCardIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing plan',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({
      name: 'pageRange',
      type: 'string',
      description: 'e.g. "1–10 page website".',
    }),
    defineField({
      name: 'monthlyPrice',
      type: 'number',
      description: 'USD per month.',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'yearlyPrice',
      type: 'number',
      description: 'USD per year. Only shown when the billing toggle is enabled.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'setupFeeFrom',
      title: 'Build fee starting at',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({ name: 'popular', title: 'Mark as most popular', type: 'boolean', initialValue: false }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'checklistItem' }] }),
    defineField({ name: 'monthlyAction', type: 'cta' }),
    defineField({ name: 'yearlyAction', type: 'cta' }),
    defineField({ name: 'order', type: 'number' }),
  ],
  orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', price: 'monthlyPrice' },
    prepare: ({ title, price }) => ({
      title,
      subtitle: typeof price === 'number' ? `$${price}/mo` : undefined,
    }),
  },
});
