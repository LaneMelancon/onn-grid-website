import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'business', title: 'Business info' },
    { name: 'links', title: 'Links' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site name',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'businessName',
      title: 'Legal / listing name',
      type: 'string',
      group: 'business',
    }),
    defineField({ name: 'email', type: 'string', group: 'business', validation: (rule) => rule.email() }),
    defineField({ name: 'phone', type: 'string', group: 'business' }),
    defineField({
      name: 'address',
      type: 'object',
      group: 'business',
      fields: [
        defineField({ name: 'street', type: 'string' }),
        defineField({ name: 'city', type: 'string' }),
        defineField({ name: 'region', title: 'State / region', type: 'string' }),
        defineField({ name: 'postalCode', type: 'string' }),
        defineField({ name: 'country', type: 'string', initialValue: 'US' }),
      ],
    }),
    defineField({ name: 'location', type: 'geopoint', group: 'business' }),
    defineField({
      name: 'openingHours',
      type: 'array',
      group: 'business',
      description: 'schema.org format, e.g. "Mo-Fr 09:00-18:00".',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'priceRange', type: 'string', group: 'business', description: 'e.g. "$-$$$".' }),
    defineField({
      name: 'calendlyUrl',
      title: 'Consultation scheduling URL',
      type: 'url',
      group: 'links',
      description: 'Opened by every "Schedule a call" link.',
    }),
    defineField({ name: 'clientLoginUrl', type: 'url', group: 'links' }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      group: 'links',
      of: [
        defineArrayMember({
          name: 'socialLink',
          type: 'object',
          fields: [
            defineField({ name: 'platform', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'url', type: 'url', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      group: 'seo',
      description: 'Used when a page has no SEO fields of its own.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site settings' }),
  },
});
