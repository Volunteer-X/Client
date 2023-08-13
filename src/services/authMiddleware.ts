import { ApolloLink } from '@apollo/client';
import { useAuth0 } from 'react-native-auth0';
import { clientName } from '../lib/constants/values';
import { version } from '../../package.json';

export const authMiddleware = new ApolloLink((operation, foward) => {
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
