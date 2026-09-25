import type { PAGE_QUERY_RESULT } from '@/sanity/types';

type AnySection = NonNullable<NonNullable<PAGE_QUERY_RESULT>['sections']>[number];

/** A resolved page-builder section, as returned by the shared sections projection. */
export type SectionData = Extract<AnySection, { _type: string }>;

export type SectionType = SectionData['_type'];

export type SectionDataOf<T extends SectionType> = Extract<SectionData, { _type: T }>;
