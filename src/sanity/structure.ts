import type { StructureResolver } from 'sanity/structure';

function singleton(S: Parameters<StructureResolver>[0], typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .id(typeName)
    .schemaType(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title));
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'siteSettings', 'Site settings'),
      singleton(S, 'navigation', 'Navigation'),
      S.divider(),
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('sharedSection').title('Shared sections'),
      S.divider(),
      S.documentTypeListItem('work').title('Work'),
      S.documentTypeListItem('tag').title('Tags'),
      S.divider(),
      S.documentTypeListItem('websiteFeature').title('Website features'),
      S.documentTypeListItem('integration').title('Integrations'),
      S.documentTypeListItem('serviceArea').title('Service areas'),
      S.documentTypeListItem('serviceAreaFeature').title('Service area features'),
      S.divider(),
      S.documentTypeListItem('pricingPlan').title('Pricing plans'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.divider(),
      S.documentTypeListItem('redirect').title('Redirects'),
    ]);
