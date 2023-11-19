import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vee-validate/core': '@vee-validate/core/dist/index.esm.js',
    },
  },
})
