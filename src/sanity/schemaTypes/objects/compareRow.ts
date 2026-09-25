import { ThListIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const compareRow = defineType({
  name: 'compareRow',
  title: 'Comparison row',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tooltip',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'cells',
      title: 'Values per plan',
      type: 'array',
      description: 'One value per plan, in the same order as the plans in this section.',
      of: [
        defineArrayMember({
          name: 'compareCell',
          type: 'object',
          fields: [
            defineField({ name: 'included', type: 'boolean', initialValue: true }),
            defineField({
              name: 'value',
              type: 'string',
              description: 'Optional text shown instead of a checkmark, e.g. "Up to 10".',
            }),
          ],
          preview: {
            select: { included: 'included', value: 'value' },
            prepare: ({ included, value }) => ({
              title: value || (included === false ? '—' : '✓'),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'label' },
  },
});
