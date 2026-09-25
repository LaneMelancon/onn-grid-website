import type { Metadata } from 'next';
import type { SanityImageSource } from '@sanity/image-url';
import { urlForImage } from '@/sanity/lib/image';

type Seo = {
  title?: string | null;
  description?: string | null;
  noIndex?: boolean | null;
  image?: (SanityImageSource & { asset?: unknown }) | null;
} | null;

type BuildMetadataOptions = {
  seo?: Seo;
  /** Used with the site title template when no SEO title is set. */
  fallbackTitle?: string | null;
  path?: string | null;
};

const OG_IMAGE_SIZE = { width: 1200, height: 630 };

/** Turns a Sanity `seo` object into Next.js metadata. SEO titles are used as-is. */
export function buildMetadata({ seo, fallbackTitle, path }: BuildMetadataOptions): Metadata {
  const title = seo?.title ? { absolute: seo.title } : (fallbackTitle ?? undefined);
  const description = seo?.description ?? undefined;
  const image = seo?.image?.asset
    ? urlForImage(seo.image)
        .width(OG_IMAGE_SIZE.width)
        .height(OG_IMAGE_SIZE.height)
        .fit('crop')
        .url()
    : undefined;

  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      description,
      url: path ?? undefined,
      images: image ? [{ url: image, ...OG_IMAGE_SIZE }] : undefined,
    },
  };
}
