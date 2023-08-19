module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'import-graphql',
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
            root: ['./src'],
            extensions: [
              '.ios.js',
              '.android.js',
              '.js',
              '.ts',
              '.tsx',
              '.json',
            ],
            alias: {
              '@components': './src/components',
              '@services': './src/services',
              '@assets': './src/assets',
              '@hooks': './src/hooks',
              '@navigation': './src/navigation',
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
