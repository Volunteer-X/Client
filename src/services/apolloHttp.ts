import { createHttpLink } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';

export const errorLink = onError(
  ({ graphQLErrors, networkError }: ErrorResponse) => {
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
  },
);

export const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});
