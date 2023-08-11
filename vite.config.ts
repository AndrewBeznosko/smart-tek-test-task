import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { checker } from 'vite-plugin-checker'
import { svgBuilder } from './build/svg/svgBuilder'

function resolve(dir: string): string {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/assets/svg-icons/'),
    checker({ vueTsc: true }),
  ],

  css: {
    /**
     * Pass global SASS/SCSS variables
     */
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/abstracts/_sass-variables.scss";
          @import "@/assets/scss/abstracts/_mixins.scss";
        `,
      },
      sass: {
        additionalData: `
          @import "@/assets/scss/abstracts/_sass-variables.scss";
          @import "@/assets/scss/abstracts/_mixins.scss";
        `,
      },
    },
  },

  /**
   * required for in-browser template compilation
   * https://vuejs.org/guide/scaling-up/tooling.html#note-on-in-browser-template-compilation
   */
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
})
