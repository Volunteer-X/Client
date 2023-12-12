import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_ALL_PING } from '../graphQL/activity.query';

export const useActivityList = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_PING, {
    variables: {
      first: 5,
      after: null,
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     console.log('data', data);
  //   }
  // }, [data, loading, error]);

  return { data, loading, error };
};
