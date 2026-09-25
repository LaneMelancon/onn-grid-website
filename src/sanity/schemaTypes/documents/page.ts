import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { collectionBasePaths, HOME_SLUG, systemPaths } from '../../../lib/routes';
import { sectionsField } from '../sections';
import { defineSlugField, documentGroups, seoField } from './shared';

const slugPattern = /^[a-z0-9]+(?:[-/][a-z0-9]+)*$/;

function validatePageSlug(slug: string): true | string {
  if (!slugPattern.test(slug)) {
    return 'Use lowercase letters, numbers, and dashes. Separate nested pages with "/".';
  }

  const [base] = slug.split('/');

  if (systemPaths.includes(base)) {
    return `"/${base}" is reserved by the site.`;
  }

  if (collectionBasePaths.includes(base) && slug !== base) {
    return `Pages can't be nested under "/${base}/"; that path belongs to a collection.`;
  }

  return true;
}

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: documentGroups,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineSlugField({
      validation: (rule) =>
        rule.required().custom((slug) => (slug?.current ? validatePageSlug(slug.current) : true)),
    }),
    sectionsField,
    seoField,
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug === HOME_SLUG ? '/' : slug ? `/${slug}` : 'No slug',
    }),
  },
});
