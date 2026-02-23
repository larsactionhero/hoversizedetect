import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: false,
  vue: false,

  // Browser-Globals aktivieren (entspricht "env: browser: true")
  globals: {
    window: 'readonly',
    document: 'readonly',
    navigator: 'readonly',
    console: 'readonly',
  },

  // Stil-Regeln (ersetzt prettier-integration)
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
}, {
  files: ['src/js/**/*.js', 'src/example/js/**/*.js'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['~', './node_modules'],
        ],
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'jsdoc/check-param-names': 'off',
  },
});
