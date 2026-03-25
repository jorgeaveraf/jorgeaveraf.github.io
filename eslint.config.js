import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        window:               'readonly',
        document:             'readonly',
        console:              'readonly',
        Promise:              'readonly',
        IntersectionObserver: 'readonly',
        fetch:                'readonly',
      },
    },
    rules: {
      'no-unused-vars':    'warn',
      'no-console':        'off',
      'eqeqeq':            ['error', 'always'],
      'no-var':            'error',
      'prefer-const':      'error',
    },
  },
];
