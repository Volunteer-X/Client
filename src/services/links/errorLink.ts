import { ErrorResponse, onError } from '@apollo/client/link/error';

import { showToast } from '@app/features/toast';
import { store } from '@redux/store';

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }: ErrorResponse) => {
    if (graphQLErrors) {
      graphQLErrors?.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });

      for (let err of graphQLErrors) {
        switch (err.extensions?.code) {
          case 'UNAUTHENTICATED':
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError is thrown in resolver
            // modify the operation context with a new token
            // const oldHeaders = operation.getContext().headers;
            // operation.setContext({
            //   headers: {
            //     ...oldHeaders,
            //     authorization: getNewToken(),
            //   },
            // });
            break;
          default:
            break;
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);

      store.dispatch(
        showToast({
          message:
            'Sorry, there was some technical issues while processsing your requests',
          type: 'error',
        }),
      );
    }

    // return;
  },
);
