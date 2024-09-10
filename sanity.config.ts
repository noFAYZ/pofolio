import {defineConfig} from 'sanity'
import {structureTool} from './sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'flex',

  projectId: 'aoc0cp24',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
