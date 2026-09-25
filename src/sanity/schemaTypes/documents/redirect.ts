import { ArrowRightIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const pathPattern = /^\/[^\s]*$/;

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: ArrowRightIcon,
  fields: [
    defineField({
      name: 'source',
      type: 'string',
      description: 'The old path, e.g. "/website-features".',
      validation: (rule) =>
        rule.required().regex(pathPattern, { name: 'path starting with "/"' }),
    }),
    defineField({
      name: 'destination',
      type: 'string',
      description: 'A path on this site ("/features/website-features") or a full URL.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'permanent',
      type: 'boolean',
      description: 'Permanent (308) redirects tell search engines the move is final.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { source: 'source', destination: 'destination' },
    prepare: ({ source, destination }) => ({ title: source, subtitle: `→ ${destination}` }),
  },
});
