import { ApolloClient, InMemoryCache, from, split } from '@apollo/client';
import { Kind, OperationTypeNode } from 'graphql';
import {
  webSocketLink as apolloWSLink,
  errorLink,
  httpLink,
  retryLink,
} from './links';
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities';

const apolloHttpLink = from([retryLink, errorLink, httpLink]);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  apolloWSLink,
  apolloHttpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllPing: relayStylePagination(),
        },
      },
    },
  }),
});

export default apolloClient;
