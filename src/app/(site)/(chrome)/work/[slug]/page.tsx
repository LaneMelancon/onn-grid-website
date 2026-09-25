import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buildMetadata } from '@/lib/metadata';
import { resolveHref } from '@/lib/routes';
import { sanityFetch } from '@/sanity/lib/live';
import { WORK_QUERY } from '@/sanity/lib/queries';
import { getSlugParams } from '@/sanity/lib/staticParams';

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSlugParams('work');
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: work } = await sanityFetch({ query: WORK_QUERY, params: { slug }, stega: false });

  if (!work) return {};

  return buildMetadata({
    seo: work.seo,
    fallbackTitle: work.title,
    path: resolveHref('work', work.slug),
  });
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const { data: work } = await sanityFetch({ query: WORK_QUERY, params: { slug } });

  if (!work) notFound();

  return (
    <>
      {/* Temporary header until the case-study hero is built */}
      <Section>
        <SectionHeader eyebrow="Work" heading={work.title} body={work.summary} headingOrder={1} />
      </Section>
      <SectionRenderer sections={work.sections} />
    </>
  );
}
