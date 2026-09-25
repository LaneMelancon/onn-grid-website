import { sanityFetch } from './live';
import { SLUGS_BY_TYPE_QUERY } from './queries';

function isSlug(slug: string | null): slug is string {
  return Boolean(slug);
}

/** Published slugs for a document type, shaped for `generateStaticParams`. */
export async function getSlugParams(type: string) {
  const { data: slugs } = await sanityFetch({
    query: SLUGS_BY_TYPE_QUERY,
    params: { type },
    perspective: 'published',
    stega: false,
  });

  return slugs.filter(isSlug).map((slug) => ({ slug }));
}
