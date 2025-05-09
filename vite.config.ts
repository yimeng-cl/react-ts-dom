import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
const H2OTheme = require('@cffe/h2o-theme');

// @ts-ignore 不会
import ReplaceLessVar from '@hbos/umi-plugin-builder-optimize/babel-loader/replace-less-var';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve('src') },
      { find: /^~/, replacement: '' },
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          ...H2OTheme,
          '@h2o-prefix': 'ant'
        },
        plugins: [new ReplaceLessVar()]
      }
    }
  },
})
