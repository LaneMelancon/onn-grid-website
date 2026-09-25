import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buildMetadata } from '@/lib/metadata';
import { resolveHref } from '@/lib/routes';
import { sanityFetch } from '@/sanity/lib/live';
import { SERVICE_AREA_QUERY } from '@/sanity/lib/queries';
import { getSlugParams } from '@/sanity/lib/staticParams';

type ServiceAreaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSlugParams('serviceArea');
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: area } = await sanityFetch({
    query: SERVICE_AREA_QUERY,
    params: { slug },
    stega: false,
  });

  if (!area) return {};

  return buildMetadata({
    seo: area.seo,
    fallbackTitle: area.title,
    path: resolveHref('serviceArea', area.slug),
  });
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const { slug } = await params;
  const { data: area } = await sanityFetch({ query: SERVICE_AREA_QUERY, params: { slug } });

  if (!area) notFound();

  return (
    <>
      {/* Temporary header until the service-area template is built */}
      <Section>
        <SectionHeader eyebrow="Service area" heading={area.title} headingOrder={1} />
      </Section>
      <SectionRenderer sections={area.sections} />
    </>
  );
}
