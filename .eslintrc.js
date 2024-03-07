module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    semi: 'off',
  },
};
