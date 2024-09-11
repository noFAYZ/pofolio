import {defineConfig} from 'sanity'
import {structure} from './sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'flex',

  projectId: 'aoc0cp24',
  dataset: 'production',

  plugins: [structure(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
