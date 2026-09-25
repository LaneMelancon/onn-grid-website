import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';
import { SkipLink } from '@/components/layout/SkipLink';
import { buildMetadata } from '@/lib/metadata';
import { gtmId, isProductionDeployment, siteName } from '@/lib/site';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY, stega: false });
  const name = settings?.title ?? siteName;
  const defaults = buildMetadata({ seo: settings?.defaultSeo ?? null });

  return {
    ...defaults,
    title: { default: settings?.defaultSeo?.title ?? name, template: `%s | ${name}` },
    openGraph: { ...defaults.openGraph, siteName: name },
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <SkipLink />
      {children}
      <SanityLive includeDrafts={isDraftMode} />
      {isDraftMode && <VisualEditing />}
      {isProductionDeployment && gtmId && <GoogleTagManager gtmId={gtmId} />}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
