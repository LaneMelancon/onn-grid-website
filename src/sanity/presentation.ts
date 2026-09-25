import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation';
import { HOME_SLUG, resolveHref } from '../lib/routes';

function locationsFor(type: string) {
  return defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => {
      const href = resolveHref(type, doc?.slug);
      return href ? { locations: [{ title: doc?.title || 'Untitled', href }] } : null;
    },
  });
}

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    { route: '/', filter: `_type == "page" && slug.current == "${HOME_SLUG}"` },
    { route: '/work/:slug', filter: `_type == "work" && slug.current == $slug` },
    { route: '/website-features/:slug', filter: `_type == "websiteFeature" && slug.current == $slug` },
    { route: '/service-areas/:slug', filter: `_type == "serviceArea" && slug.current == $slug` },
    {
      route: '/service-area-features/:slug',
      filter: `_type == "serviceAreaFeature" && slug.current == $slug`,
    },
    { route: '/:slug', filter: `_type == "page" && slug.current == $slug` },
  ]),
  locations: {
    page: locationsFor('page'),
    work: locationsFor('work'),
    websiteFeature: locationsFor('websiteFeature'),
    serviceArea: locationsFor('serviceArea'),
    serviceAreaFeature: locationsFor('serviceAreaFeature'),
  },
};
