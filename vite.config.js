import { resolve } from 'node:path';
import alias from '@rollup/plugin-alias';
import { defineConfig } from 'vite';

const path = resolve(__dirname);
const rootPath = resolve(__dirname, './src');

export default defineConfig({
  base: '',
  root: rootPath,
  plugins: [
    alias(),
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
        chunkFileNames: 'example/js/[name].js',
        entryFileNames: 'example/js/[name].js',
        assetFileNames: ({ name }) => {
          if (/\.(jpe?g|png|svg)$/.test(name ?? '')) {
            return 'example/img/[name][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'example/css/style[extname]';
          }
          return 'example/[name][extname]';
        },
      },
    },
  },
});
