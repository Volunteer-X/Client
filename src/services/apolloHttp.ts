import {
  AUTH0_CLIENT,
  AUTH0_DOMAIN,
  DEV_HOST,
  DEV_HTTP_PATH,
  DEV_PORT,
  DEV_SCHEME,
} from '@env';

import Auth0 from 'react-native-auth0';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

console.log('URL', `${DEV_SCHEME}://${DEV_HOST}:${DEV_PORT}/${DEV_HTTP_PATH}`);

const link = createHttpLink({
  uri: `${DEV_SCHEME}://${DEV_HOST}:${DEV_PORT}/${DEV_HTTP_PATH}`,
});

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
export const httpLink = authLink.concat(link);
