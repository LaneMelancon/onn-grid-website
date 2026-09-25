import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { buildMetadata } from '@/lib/metadata';
import { HOME_SLUG, resolveHref, STANDALONE_PAGE_SLUGS } from '@/lib/routes';
import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from '@/sanity/lib/queries';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

function toPageSlug(segments?: string[]) {
  return segments?.length ? segments.join('/') : HOME_SLUG;
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: PAGE_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return slugs
    .filter((slug): slug is string => slug !== null && !STANDALONE_PAGE_SLUGS.includes(slug))
    .map((slug) => ({ slug: slug === HOME_SLUG ? [] : slug.split('/') }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = toPageSlug((await params).slug);
  const { data: page } = await sanityFetch({ query: PAGE_QUERY, params: { slug }, stega: false });

  if (!page) return {};

  return buildMetadata({
    seo: page.seo,
    fallbackTitle: page.title,
    path: resolveHref('page', page.slug),
  });
}

export default async function Page({ params }: PageProps) {
  const { slug: segments } = await params;
  const slug = toPageSlug(segments);

  // The home page lives at "/", never at "/home".
  if (segments?.length && slug === HOME_SLUG) permanentRedirect('/');

  const { data: page } = await sanityFetch({ query: PAGE_QUERY, params: { slug } });

  if (!page) notFound();

  return <SectionRenderer sections={page.sections} />;
}
