const eslintSveltePreprocess = require('eslint-svelte3-preprocess');
const svelteConfig = require('./svelte.config');

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
    node: true,
  },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'svelte3',
  ],
  overrides: [
    {
      files: ['src/**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
	settings: {
    'svelte3/preprocess': eslintSveltePreprocess(svelteConfig.preprocess)
  },
  rules: {
    'semi': 'off',
    '@typescript-eslint/semi': 'error',
    'comma-dangle': ['error', 'always-multiline'],
  },
};
