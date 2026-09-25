import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buildMetadata } from '@/lib/metadata';
import { resolveHref } from '@/lib/routes';
import { sanityFetch } from '@/sanity/lib/live';
import { SERVICE_AREA_FEATURE_QUERY } from '@/sanity/lib/queries';
import { getSlugParams } from '@/sanity/lib/staticParams';

type ServiceAreaFeaturePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSlugParams('serviceAreaFeature');
}

export async function generateMetadata({ params }: ServiceAreaFeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: feature } = await sanityFetch({
    query: SERVICE_AREA_FEATURE_QUERY,
    params: { slug },
    stega: false,
  });

  if (!feature) return {};

  return buildMetadata({
    seo: feature.seo,
    fallbackTitle: feature.serviceArea ? `${feature.title} in ${feature.serviceArea}` : feature.title,
    path: resolveHref('serviceAreaFeature', feature.slug),
  });
}

export default async function ServiceAreaFeaturePage({ params }: ServiceAreaFeaturePageProps) {
  const { slug } = await params;
  const { data: feature } = await sanityFetch({
    query: SERVICE_AREA_FEATURE_QUERY,
    params: { slug },
  });

  if (!feature) notFound();

  // Temporary layout until the article template is built
  return (
    <Section>
      <SectionHeader
        eyebrow={feature.eyebrow ?? feature.serviceArea}
        heading={feature.title}
        body={feature.summary}
        headingOrder={1}
      />
    </Section>
  );
}
