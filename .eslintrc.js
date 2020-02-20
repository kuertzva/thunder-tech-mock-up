module.exports = {
  extends: ['airbnb-base', 'plugin:react/recommended'],
  plugins: ['import', 'node', 'promise', 'react'],
  globals: {
    document: 'readonly',
  },
  rules: {
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': ['error', { code: 120 }],
    'no-unused-vars': ['off'],
    'no-return-assign': 'off',
    'prefer-arrow-callback': 'off',
    quotes: ['error', 'single'],
    semi: 'off',
    'space-before-function-paren': 'off',
  },
}
