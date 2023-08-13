import { ApolloClient, InMemoryCache, from, split } from '@apollo/client';
import { authMiddleware } from './authMiddleware';
import { errorLink, httpLink } from './apolloHttp';
import { getMainDefinition } from '@apollo/client/utilities';

import { webSocketLink as apolloWSLink } from './apolloWebSocket';
import { Kind, OperationTypeNode } from 'graphql';

const apolloHttpLink = from([authMiddleware, errorLink, httpLink]);

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
  cache: new InMemoryCache(),
});

export default apolloClient;
