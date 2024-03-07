const { babelOptimizerPlugin } = require('@graphql-codegen/client-preset');
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      babelOptimizerPlugin,
      { artifactDirectory: './src/__generated__/gql', gqlTagName: 'gql' },
    ],
    // 'import-graphql',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    development: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['.'],
            extensions: [
              '.ios.js',
              '.android.js',
              '.js',
              '.ts',
              '.tsx',
              '.json',
            ],
            alias: {
              '@app': './src',
              '@components': './src/components',
              '@services': './src/services',
              '@assets': './src/assets',
              '@hooks': './src/hooks',
              '@navigation': './src/navigation',
              '@theme': './src/theme',
              '@features': './src/features',
              '@ts-types': './src/types',
              '@redux': './app',
            },
          },
        ],
      ],
    },
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
