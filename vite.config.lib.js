import { resolve } from 'node:path';
import alias from '@rollup/plugin-alias';
import { defineConfig } from 'vite';

const path = resolve(__dirname);

export default defineConfig({
  plugins: [
    alias(),
  ],
  resolve: {
    alias: {
      '~': resolve(path, './node_modules'),
      '@': resolve(path, './src'),
    },
  },
  build: {
    outDir: resolve(path, './dist'),
    emptyOutDir: false,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    lib: {
      entry: resolve(path, './index.js'),
      name: 'HoverSizeDetect',
      fileName: () => 'js/hoversizedetect.js',
      formats: ['es'],
    },
  },
});
