import { PinIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { sectionsField } from '../sections';
import { defineSlugField, documentGroups, seoField } from './shared';

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service area',
  type: 'document',
  icon: PinIcon,
  groups: documentGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Area name',
      type: 'string',
      group: 'content',
      description: 'City or region, e.g. "Colorado Springs".',
      validation: (rule) => rule.required(),
    }),
    defineSlugField(),
    defineField({
      name: 'features',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'websiteFeature' }] }],
      validation: (rule) => rule.unique(),
    }),
    sectionsField,
    seoField,
  ],
});
