import { MenuIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({
      name: 'menu',
      title: 'Menu links',
      type: 'array',
      group: 'header',
      of: [{ type: 'navItem' }],
    }),
    defineField({
      name: 'menuSecondary',
      title: 'Menu secondary links',
      type: 'array',
      group: 'header',
      description: 'Smaller links in the menu, e.g. client login, email, phone.',
      of: [{ type: 'navItem' }],
    }),
    defineField({ name: 'headerAction', title: 'Header button', type: 'cta', group: 'header' }),
    defineField({ name: 'footerTagline', type: 'text', rows: 2, group: 'footer' }),
    defineField({
      name: 'footerColumns',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          name: 'footerColumn',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'links', type: 'array', of: [{ type: 'navItem' }] }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation' }),
  },
});
