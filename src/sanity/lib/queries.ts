import { defineQuery } from 'next-sanity';

/*
 * Reusable projections. Keep references resolved here so components receive
 * plain data and never need to know how content is stored.
 */

const imageFields = /* groq */ `
  _type,
  alt,
  crop,
  hotspot,
  asset->{ _id, url, metadata { lqip, dimensions { width, height, aspectRatio } } }
`;

const linkFields = /* groq */ `
  kind,
  url,
  email,
  phone,
  anchor,
  openInNewTab,
  "target": reference->{ _type, "slug": slug.current }
`;

const ctaFields = /* groq */ `
  _key,
  label,
  variant,
  link { ${linkFields} }
`;

const mediaFields = /* groq */ `
  _key,
  kind,
  image { ${imageFields} },
  "videoUrl": video.asset->url,
  poster { ${imageFields} },
  loop
`;

const richTextFields = /* groq */ `
  ...,
  markDefs[] {
    ...,
    _type == "link" => { ${linkFields} }
  }
`;

/** Documents rendered as cards share one shape, whatever their type. */
const documentCardFields = /* groq */ `
  "_key": _id,
  _type,
  "slug": slug.current,
  title,
  "eyebrow": coalesce(eyebrow, company),
  "body": coalesce(summary, quote),
  "name": name,
  "image": coalesce(thumbnail, icon, logo, avatar) { ${imageFields} },
  "tags": tags[]->title
`;

const sectionFields = /* groq */ `
  ...,
  actions[] { ${ctaFields} },
  _type == "heroSection" => {
    media { ${mediaFields} }
  },
  _type == "splitSection" => {
    body[] { ${richTextFields} },
    media[] { ${mediaFields} }
  },
  _type == "mediaSection" => {
    items[] { ${mediaFields} }
  },
  _type == "cardsSection" => {
    "items": select(
      source == "manual" => cards[] {
        _key,
        eyebrow,
        title,
        body,
        "image": icon { ${imageFields} },
        action { ${ctaFields} }
      },
      selection == "selected" => documents[]-> { ${documentCardFields} },
      *[_type == ^.source] | order(coalesce(order, 999) asc, _createdAt desc) { ${documentCardFields} }
    )
  },
  _type == "processSection" => {
    steps[] { _key, title, body, actions[] { ${ctaFields} } }
  },
  _type == "pricingSection" => {
    plans[]-> {
      _id,
      title,
      description,
      pageRange,
      monthlyPrice,
      yearlyPrice,
      setupFeeFrom,
      popular,
      features,
      monthlyAction { ${ctaFields} },
      yearlyAction { ${ctaFields} }
    },
    customPlan { ..., action { ${ctaFields} } }
  },
  _type == "faqSection" => {
    faqs[]-> { _id, question, answer[] { ${richTextFields} } },
    callout { ..., action { ${ctaFields} } },
    footnote[] { ${richTextFields} }
  },
  _type == "calloutSection" => {
    media { ${mediaFields} }
  },
  _type == "tabsSection" => {
    tabs[] {
      ...,
      cards[] { ..., "image": icon { ${imageFields} }, action { ${ctaFields} } },
      media { ${mediaFields} }
    }
  },
  _type == "richTextSection" => {
    content[] { ${richTextFields} }
  }
`;

const sectionsProjection = /* groq */ `
  sections[] {
    _type == "sectionReference" => sharedSection->section[0] { ${sectionFields} },
    _type != "sectionReference" => { ${sectionFields} }
  }
`;

const seoFields = /* groq */ `
  seo { title, description, noIndex, image { ${imageFields} } }
`;

/* Site-wide */

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    title,
    businessName,
    email,
    phone,
    address,
    location,
    openingHours,
    priceRange,
    calendlyUrl,
    clientLoginUrl,
    socialLinks,
    defaultSeo { title, description, image { ${imageFields} } }
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"][0] {
    menu[] { _key, label, link { ${linkFields} } },
    menuSecondary[] { _key, label, link { ${linkFields} } },
    headerAction { ${ctaFields} },
    footerTagline,
    footerColumns[] {
      _key,
      title,
      links[] { _key, label, link { ${linkFields} } }
    }
  }
`);

/* Pages */

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    ${seoFields},
    ${sectionsProjection}
  }
`);

export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)].slug.current
`);

/* Collections */

export const WORK_QUERY = defineQuery(`
  *[_type == "work" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    summary,
    heroImage { ${imageFields} },
    services,
    websiteUrl,
    websiteLabel,
    "tags": tags[]->title,
    publishedAt,
    ${seoFields},
    ${sectionsProjection}
  }
`);

export const WEBSITE_FEATURE_QUERY = defineQuery(`
  *[_type == "websiteFeature" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    eyebrow,
    summary,
    overviewHeading,
    intro[] { ${richTextFields} },
    body[] { ${richTextFields} },
    ${seoFields}
  }
`);

export const SERVICE_AREA_QUERY = defineQuery(`
  *[_type == "serviceArea" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    features[]-> { ${documentCardFields} },
    ${seoFields},
    ${sectionsProjection}
  }
`);

export const SERVICE_AREA_FEATURE_QUERY = defineQuery(`
  *[_type == "serviceAreaFeature" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "serviceArea": serviceArea->title,
    eyebrow,
    summary,
    image { ${imageFields} },
    intro[] { ${richTextFields} },
    body[] { ${richTextFields} },
    ${seoFields}
  }
`);

export const SLUGS_BY_TYPE_QUERY = defineQuery(`
  *[_type == $type && defined(slug.current)].slug.current
`);

/* Sitemap */

export const SITEMAP_QUERY = defineQuery(`
  *[
    _type in ["page", "work", "websiteFeature", "serviceArea", "serviceAreaFeature"]
    && defined(slug.current)
    && seo.noIndex != true
  ] {
    _type,
    "slug": slug.current,
    _updatedAt
  }
`);
