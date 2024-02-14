import { createHttpLink } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  AUTH0_CLIENT,
  AUTH0_DOMAIN,
  DEV_HOST,
  DEV_HTTP_PATH,
  DEV_PORT,
  DEV_SCHEME,
} from '@env';
import Auth0 from 'react-native-auth0';

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

// ! Possible bug
const authLink = setContext(async (_, { headers }) => {
  const auth0 = new Auth0({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT,
  });

  const hasValidCredentials =
    await auth0.credentialsManager.hasValidCredentials();

  const credentials = await auth0.credentialsManager.getCredentials();

  let token;

  if (hasValidCredentials) {
    token = credentials.accessToken;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});

console.log('URL', `${DEV_SCHEME}://${DEV_HOST}:${DEV_PORT}/${DEV_HTTP_PATH}`);

const link = createHttpLink({
  uri: `${DEV_SCHEME}://${DEV_HOST}:${DEV_PORT}/${DEV_HTTP_PATH}`,
});

export const httpLink = authLink.concat(link);
