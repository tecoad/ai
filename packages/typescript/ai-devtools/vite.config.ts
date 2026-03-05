import { defineConfig, mergeConfig } from 'vitest/config'
import { tanstackViteConfig } from '@tanstack/vite-config'
import solid from 'vite-plugin-solid'
import packageJson from './package.json'

const config = defineConfig({
  plugins: [solid() as any],
  test: {
    name: packageJson.name,
    dir: './tests',
    watch: false,
    environment: 'jsdom',
    coverage: { enabled: true, include: ['src/**/*'] },
    typecheck: { enabled: true },
  },
})

const merged = mergeConfig(
  config,
  tanstackViteConfig({
    entry: ['./src/index.ts', './src/production.ts'],
    srcDir: './src',
    cjs: false,
    bundledDeps: [
      'solid-js',
      'solid-js/web',
      'solid-js/store',
      '@tanstack/devtools-utils',
      '@tanstack/devtools-utils/solid',
      '@tanstack/devtools-ui',
      'goober',
    ],
  }),
)

merged.build.rollupOptions.output.manualChunks = undefined
merged.build.rollupOptions.output.preserveModules = false

export default merged
