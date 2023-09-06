import { ApolloLink } from '@apollo/client';
import Auth0 from 'react-native-auth0';
import { clientName } from '../lib/constants/values';
import { version } from '../../package.json';
import { AUTH0_CLIENT, AUTH0_DOMAIN } from '@env';

export const authMiddleware = new ApolloLink((operation, foward) => {
  operation.setContext(async ({ headers = {} }) => {
    let token: string | undefined;

    const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT });

    auth0.credentialsManager
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
