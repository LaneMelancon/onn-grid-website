import { LinkIcon } from '@sanity/icons';
import { defineField, defineType, type ValidationContext } from 'sanity';
import { linkableTypes } from '../../../lib/routes';

type LinkKind = 'internal' | 'external' | 'email' | 'phone' | 'calendly';

function kindOf(parent: unknown): LinkKind | undefined {
  return (parent as { kind?: LinkKind } | undefined)?.kind;
}

function requiredFor(kind: LinkKind) {
  return (value: unknown, context: ValidationContext) =>
    kindOf(context.parent) === kind && !value ? 'Required' : true;
}

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'kind',
      title: 'Link to',
      type: 'string',
      initialValue: 'internal',
      options: {
        list: [
          { title: 'Page on this site', value: 'internal' },
          { title: 'External URL', value: 'external' },
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' },
          { title: 'Schedule a call', value: 'calendly' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reference',
      title: 'Page',
      type: 'reference',
      to: linkableTypes.map((type) => ({ type })),
      hidden: ({ parent }) => kindOf(parent) !== 'internal',
      validation: (rule) => rule.custom(requiredFor('internal')),
    }),
    defineField({
      name: 'anchor',
      title: 'Section anchor',
      type: 'string',
      description: 'Optional. The anchor ID of a section on that page, without the #.',
      hidden: ({ parent }) => kindOf(parent) !== 'internal',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => kindOf(parent) !== 'external',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).custom(requiredFor('external')),
    }),
    defineField({
      name: 'email',
      type: 'string',
      hidden: ({ parent }) => kindOf(parent) !== 'email',
      validation: (rule) => rule.email().custom(requiredFor('email')),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      hidden: ({ parent }) => kindOf(parent) !== 'phone',
      validation: (rule) => rule.custom(requiredFor('phone')),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in a new tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => kindOf(parent) !== 'external',
    }),
  ],
});
