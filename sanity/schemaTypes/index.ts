import type { SchemaTypeDefinition, Template } from 'sanity'

import { author } from './author'
import { post } from './post'
import { project } from './project'
import { servicePage } from './servicePage'
import { locationPage } from './locationPage'
import { localizedInitialValueTemplates } from './initialValueTemplates'

export const schema: {
  types: SchemaTypeDefinition[]
  templates: Template[]
} = {
  types: [author, post, project, servicePage, locationPage],
  templates: localizedInitialValueTemplates,
}
