module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: ['error', 'never'],
    'linebreak-style': 0,
    'no-unused-vars': ['error', {
      argsIgnorePattern: ['next', 'req'],
    }],
    'object-curly-newline': ['error', {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true,
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true, minProperties: 3,
      },
    }],
  },
}
