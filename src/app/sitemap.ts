import type { MetadataRoute } from 'next';
import { resolveHref } from '@/lib/routes';
import { siteUrl } from '@/lib/site';
import { sanityFetch } from '@/sanity/lib/live';
import { SITEMAP_QUERY } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: entries } = await sanityFetch({
    query: SITEMAP_QUERY,
    perspective: 'published',
    stega: false,
  });

  return entries.flatMap(({ _type, slug, _updatedAt }) => {
    const href = resolveHref(_type, slug);
    return href ? [{ url: `${siteUrl}${href}`, lastModified: _updatedAt }] : [];
  });
}
