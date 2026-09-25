import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buildMetadata } from '@/lib/metadata';
import { resolveHref } from '@/lib/routes';
import { sanityFetch } from '@/sanity/lib/live';
import { WEBSITE_FEATURE_QUERY } from '@/sanity/lib/queries';
import { getSlugParams } from '@/sanity/lib/staticParams';

type WebsiteFeaturePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSlugParams('websiteFeature');
}

export async function generateMetadata({ params }: WebsiteFeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: feature } = await sanityFetch({
    query: WEBSITE_FEATURE_QUERY,
    params: { slug },
    stega: false,
  });

  if (!feature) return {};

  return buildMetadata({
    seo: feature.seo,
    fallbackTitle: feature.title,
    path: resolveHref('websiteFeature', feature.slug),
  });
}

export default async function WebsiteFeaturePage({ params }: WebsiteFeaturePageProps) {
  const { slug } = await params;
  const { data: feature } = await sanityFetch({ query: WEBSITE_FEATURE_QUERY, params: { slug } });

  if (!feature) notFound();

  // Temporary layout until the article template (table of contents, progress bar) is built
  return (
    <Section>
      <SectionHeader
        eyebrow={feature.eyebrow}
        heading={feature.title}
        body={feature.summary}
        headingOrder={1}
      />
    </Section>
  );
}
