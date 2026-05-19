import type { SchemaTypeDefinition, Template } from 'sanity'

import { author } from './author'
import { post } from './post'
import { project } from './project'
import { localizedInitialValueTemplates } from './initialValueTemplates'

export const schema: {
  types: SchemaTypeDefinition[]
  templates: Template[]
} = {
  types: [author, post, project],
  templates: localizedInitialValueTemplates,
}
