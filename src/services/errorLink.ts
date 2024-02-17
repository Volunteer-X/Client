import { ErrorResponse, onError } from '@apollo/client/link/error';

import { RetryLink } from '@apollo/client/link/retry';

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
      console.error(`[Network error]: ${networkError.message}`);

      throw new Error(networkError.message);
    }

    return;
  },
);

export const retryLink = new RetryLink();
