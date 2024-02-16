import { useQuery } from '@apollo/client';
import { GET_PINGS_WITHIN_RADIUS } from '@app/graphql/location.query';
import { Activity, User } from '@app/types/entities';
import { featureCollection, point } from '@turf/helpers';
import { GraphQLLatitude, GraphQLLongitude } from 'graphql-scalars';
import { useEffect, useState } from 'react';

export const useNearbyPing = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const [result, setResult] = useState<GeoJSON.FeatureCollection>(
    featureCollection([]),
  );

  const {
    data: queryData,
    loading,
    error,
    refetch,
  } = useQuery(GET_PINGS_WITHIN_RADIUS, {
    variables: {
      payload: {
        latitude: latitude.toString(),
        longitude: longitude,
        radius: 200,
      },
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const totalCount = queryData?.getPingsWithinRadius?.totalCount;
      const edges = queryData?.getPingsWithinRadius?.edges;

      const data = await new Promise<GeoJSON.FeatureCollection>(resolve => {
        setTimeout(() => {
          if (totalCount === 0 || !edges) {
            resolve(featureCollection([]));
            return;
          }
          const feature = edges.map(item => {
            let aFeature = point([
              GraphQLLongitude.parseValue(item?.node?.longitude),
              GraphQLLatitude.parseValue(item?.node?.latitude),
            ]);
            aFeature.id = `${item?.node?.id}`;
            // aFeature.properties = {
            //   ...item?.node,
            // };

            let activity: Activity = {
              id: item?.node?.id,
              title: item?.node?.title,
              description: item?.node?.description,
              picks: item?.node?.picks,
              url: item?.node?.url,
              media: item?.node?.media,
              createdAt: item?.node?.createdAt,
              latitude: item?.node?.latitude,
              longitude: item?.node?.longitude,
            };

            let creator: User = {
              id: item.node.user?.id ? item.node.user?.id : '',
              username: item.node.user?.username
                ? item.node.user?.username
                : '',
              email: item.node.user?.email ? item.node.user?.email : '',
              name: {
                __typename: item.node.user?.name?.__typename,
                firstName: item.node.user?.name?.firstName
                  ? item.node.user?.name?.firstName
                  : '',
                lastName: item.node.user?.name?.lastName
                  ? item.node.user?.name?.lastName
                  : '',
              },
              picture: item.node.user?.picture,
              picks: item.node.user?.picks ? item.node.user.picks : [],
            };

            aFeature.properties = {
              activity: activity,
              creator: creator,
            };

            return aFeature;
          });

          const aCollection = featureCollection(feature);

          resolve(aCollection);
        }, 200);
      });

      setResult(data);
    };

    fetchData();
  }, [queryData]);

  return {
    collection: result,
    loading,
    refetch,
  };
};
