import { documentTypes } from './documents';
import { objectTypes } from './objects';
import { sectionTypes } from './sections';
import { singletonTypes } from './singletons';

export const schemaTypes = [...singletonTypes, ...documentTypes, ...sectionTypes, ...objectTypes];
