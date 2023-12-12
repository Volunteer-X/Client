import { ApolloClient, InMemoryCache, from, split } from '@apollo/client';
import { errorLink, httpLink } from './apolloHttp';
import {
  getMainDefinition,
  relayStylePagination,
} from '@apollo/client/utilities';

import { webSocketLink as apolloWSLink } from './apolloWebSocket';
import { Kind, OperationTypeNode } from 'graphql';

// Todo include authMiddleware after it is implemented in the server
// const apolloHttpLink = from([authMiddleware, errorLink, httpLink]);

const apolloHttpLink = from([errorLink, httpLink]);

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
