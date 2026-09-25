import type { ComponentType } from 'react';
import type { SectionDataOf, SectionType } from './types';

type SectionRegistry = {
  [T in SectionType]?: ComponentType<SectionDataOf<T>>;
};

/**
 * Maps each Sanity section type to the component that renders it.
 * Sections without an entry render a placeholder in development and nothing in production.
 */
export const sectionComponents: SectionRegistry = {};
