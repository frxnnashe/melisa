import { realpathSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const root = realpathSync(globalThis.process.cwd())
globalThis.process.chdir(root)

export default defineConfig({
  root,
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        bodasBariloche: resolve(root, 'bodas-bariloche/index.html'),
      },
    },
  },
})
