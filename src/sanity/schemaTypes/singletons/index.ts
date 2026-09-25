import { navigation } from './navigation';
import { siteSettings } from './siteSettings';

export const singletonTypes = [siteSettings, navigation];

export const singletonTypeNames = new Set(singletonTypes.map((type) => type.name));
