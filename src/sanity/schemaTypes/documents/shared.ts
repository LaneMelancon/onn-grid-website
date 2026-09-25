import { defineField, type FieldGroupDefinition, type SlugRule } from 'sanity';

export const documentGroups: FieldGroupDefinition[] = [
  { name: 'content', title: 'Content', default: true },
  { name: 'seo', title: 'SEO' },
];

export const seoField = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'seo',
  group: 'seo',
});

export function defineSlugField(options: { source?: string; validation?: (rule: SlugRule) => SlugRule } = {}) {
  const { source = 'title', validation = (rule) => rule.required() } = options;

  return defineField({
    name: 'slug',
    type: 'slug',
    group: 'content',
    options: { source, maxLength: 96 },
    validation,
  });
}
