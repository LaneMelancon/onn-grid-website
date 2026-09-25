import { defineArrayMember, defineField } from 'sanity';
import { calloutSection } from './calloutSection';
import { cardsSection } from './cardsSection';
import { embedSection } from './embedSection';
import { faqSection } from './faqSection';
import { formSection } from './formSection';
import { heroSection } from './heroSection';
import { mediaSection } from './mediaSection';
import { pricingSection } from './pricingSection';
import { processSection } from './processSection';
import { richTextSection } from './richTextSection';
import { sectionReference } from './sectionReference';
import { splitSection } from './splitSection';
import { tabsSection } from './tabsSection';

/** Sections that hold their own content. Order here is the order editors see in the insert menu. */
export const contentSectionTypes = [
  heroSection,
  splitSection,
  cardsSection,
  calloutSection,
  faqSection,
  processSection,
  pricingSection,
  tabsSection,
  mediaSection,
  richTextSection,
  formSection,
  embedSection,
];

export const sectionTypes = [...contentSectionTypes, sectionReference];

/** The page-builder field used by every document that is composed of sections. */
export const sectionsField = defineField({
  name: 'sections',
  type: 'array',
  group: 'content',
  of: sectionTypes.map((section) => defineArrayMember({ type: section.name })),
});
