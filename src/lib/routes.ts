/**
 * The single map from Sanity document types to URLs. Links, the sitemap, and
 * the Presentation tool all resolve paths through here.
 */

export const HOME_SLUG = 'home';

export const BIO_LINKS_SLUG = 'bio-links';

/** Pages with their own route (rendered without the site header and footer). */
export const STANDALONE_PAGE_SLUGS = [BIO_LINKS_SLUG];

const collectionPaths = {
  work: 'work',
  websiteFeature: 'website-features',
  serviceArea: 'service-areas',
  serviceAreaFeature: 'service-area-features',
} as const;

type CollectionType = keyof typeof collectionPaths;

export type LinkableType = 'page' | CollectionType;

export const linkableTypes: LinkableType[] = [
  'page',
  ...(Object.keys(collectionPaths) as CollectionType[]),
];

/** Base paths owned by collections. A page may use one as its slug but can't nest under it. */
export const collectionBasePaths: string[] = Object.values(collectionPaths);

/** Paths owned by the app itself. Pages can't use these at all. */
export const systemPaths = ['studio', 'api', 'style-guide'];

function isCollectionType(type: string): type is CollectionType {
  return type in collectionPaths;
}

export function resolveHref(type?: string | null, slug?: string | null): string | null {
  if (!type || !slug) return null;

  if (type === 'page') {
    return slug === HOME_SLUG ? '/' : `/${slug}`;
  }

  if (isCollectionType(type)) {
    return `/${collectionPaths[type]}/${slug}`;
  }

  return null;
}
