import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/__generated__/gql/': {
      schema: 'http://localhost:3500/graphql/',
      // documents: ['src/**/*.tsx'],
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
