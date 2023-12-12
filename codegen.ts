import { CodegenConfig } from '@graphql-codegen/cli';
import { GraphQLScalarTypeExtensions } from 'graphql';
import { resolvers } from 'graphql-scalars';

const scalars = Object.entries(resolvers).reduce<
  Record<string, GraphQLScalarTypeExtensions['codegenScalarType']>
>((acc, [key, value]) => {
  const extensions = value.toConfig().extensions;

  if ('codegenScalarType' in extensions === false) {
    return acc;
  }
  acc[key] = extensions.codegenScalarType;
  return acc;
}, {});

const config: CodegenConfig = {
  generates: {
    './src/__generated__/gql/': {
      schema: 'http://localhost:3500/graphql/',
      documents: [
        './src/lib/fragments/*.ts',
        './src/features/auth/graphql/auth.*.ts',
        './src/features/ping/graphql/ping.*.ts',
        './src/features/activity/graphql/activity.*.ts',
      ],
      preset: 'client',
      config: {
        scalars: {
          ...scalars,
        },
        strictScalars: true,
      },
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;
