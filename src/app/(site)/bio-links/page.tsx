import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { buildMetadata } from '@/lib/metadata';
import { BIO_LINKS_SLUG } from '@/lib/routes';
import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY } from '@/sanity/lib/queries';

// A standalone link-in-bio page: same page builder, no site header or footer.
const slug = BIO_LINKS_SLUG;

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({ query: PAGE_QUERY, params: { slug }, stega: false });

  if (!page) return {};

  return buildMetadata({ seo: page.seo, fallbackTitle: page.title, path: `/${slug}` });
}

export default async function BioLinksPage() {
  const { data: page } = await sanityFetch({ query: PAGE_QUERY, params: { slug } });

  if (!page) notFound();

  return (
    <main id="main">
      <SectionRenderer sections={page.sections} />
    </main>
  );
}
