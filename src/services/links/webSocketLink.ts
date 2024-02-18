import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import {
  AUTH0_CLIENT,
  AUTH0_DOMAIN,
  DEV_HOST,
  DEV_PORT,
  DEV_WS_PATH,
} from '@env';
import { createClient } from 'graphql-ws';
import Auth0 from 'react-native-auth0';

const WS_URI = `wss://${DEV_HOST}:${DEV_PORT}/${DEV_WS_PATH}`;

export const webSocketLink = new GraphQLWsLink(
  createClient({
    url: WS_URI,
    connectionParams: () => {
      const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT });

      return {
        token: `Bearer ${auth0.credentialsManager
          .getCredentials()
          .then(res => res.accessToken)}`,
      };
    },
    retryAttempts: 5,
  }),
);
