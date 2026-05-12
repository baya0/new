'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {documentInternationalization} from '@sanity/document-internationalization'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // One translated copy of a document per language. Editors get a
    // "Translations" panel in the Studio sidebar with buttons to create
    // an Arabic or Turkish copy of any project / post / author.
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'ar', title: 'Arabic'},
        {id: 'tr', title: 'Turkish'},
      ],
      schemaTypes: ['project', 'post', 'author'],
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
