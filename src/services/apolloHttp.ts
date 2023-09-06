import { createHttpLink } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { DEV_HOST, DEV_HTTP_PATH, DEV_PORT, DEV_SCHEME } from '@env';

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
  uri: `${DEV_SCHEME}://${DEV_HOST}:${DEV_PORT}/${DEV_HTTP_PATH}`,
});
