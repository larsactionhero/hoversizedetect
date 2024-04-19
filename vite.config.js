/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import alias from '@rollup/plugin-alias';
import { resolve } from 'path';

const path = resolve(__dirname);
const rootPath = resolve(__dirname, './src');

export default defineConfig({
  base: '',
  root: rootPath,
  plugins: [
    alias()
  ],
  resolve: {
    alias: {
      '~': resolve(path, './node_modules'),
      '@': resolve(path, './src'),
    },
  },
  server: {
    host: 'localhost',
    port: 3001,
    hot: true,
  },
  build: {
    outDir: resolve(path, './dist'),
    rollupOptions: {
      input: {
        example: resolve(rootPath, 'example/index.html'),
      },
      output: {
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name ?? '')) {
            return 'css/style[extname]';
          }

          return '[name][extname]';
        },
      },
    },
  },
});
