import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { useAuth0 } from 'react-native-auth0';

import { clientName } from '../lib/constants/values';
import { version } from '../../package.json';

const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors?.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authMiddleware = new ApolloLink((operation, foward) => {
  operation.setContext(async ({ headers = {} }) => {
    let token: string | undefined;

    const auth0 = useAuth0();

    auth0
      .getCredentials()
      .catch(console.error)
      .then(t => {
        token = t?.accessToken;
      });

    return {
      headers: {
        ...headers,
        authorization: token ? 'Bearer ${token}' : '',
        'client-name': clientName,
        'client-version': version,
      },
    };
  });

  return foward(operation);
});

const apolloClient = new ApolloClient({
  link: from([authMiddleware, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
