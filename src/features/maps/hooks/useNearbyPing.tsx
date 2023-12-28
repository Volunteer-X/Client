import { useQuery } from '@apollo/client';
import { GET_PINGS_WITHIN_RADIUS } from '@app/graphql/map.query';

const useNearbyPing = () => {
  const {} = useQuery(GET_PINGS_WITHIN_RADIUS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
};
