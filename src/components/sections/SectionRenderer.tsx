import type { ComponentType } from 'react';
import { sectionComponents } from './registry';
import { SectionPlaceholder } from './SectionPlaceholder';
import type { SectionData } from './types';

type SectionRendererProps = {
  sections?: ReadonlyArray<SectionData | Record<string, never>> | null;
};

function isResolvedSection(section: SectionData | Record<string, never>): section is SectionData {
  return '_type' in section;
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections?.length) return null;

  return sections.filter(isResolvedSection).map((section) => {
    const Component = sectionComponents[section._type] as ComponentType<SectionData> | undefined;

    if (!Component) {
      return (
        <SectionPlaceholder
          key={section._key}
          type={section._type}
          tone={section.tone}
          spacing={section.spacing}
        />
      );
    }

    return <Component key={section._key} {...section} />;
  });
}
