import { useQuery } from '@apollo/client';
import { GET_PINGS_WITHIN_RADIUS } from '@app/graphql/map.query';

const useNearbyPing = () => {
  const {} = useQuery(GET_PINGS_WITHIN_RADIUS, {
    variables: {
      payload: {
        latitude: '0',
        longitude: 0,
        radius: 0,
      },
    },
    nextFetchPolicy: 'cache-first',
    pollInterval: 1000,
  });
};
