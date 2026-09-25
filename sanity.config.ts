'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId, studioUrl } from './src/sanity/env';
import { resolve } from './src/sanity/presentation';
import { schemaTypes } from './src/sanity/schemaTypes';
import { singletonTypeNames } from './src/sanity/schemaTypes/singletons';
import { structure } from './src/sanity/structure';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'onn-grid',
  title: 'Onn Grid',
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypeNames.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypeNames.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: { previewMode: { enable: '/api/draft-mode/enable' } },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
