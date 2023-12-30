import { useQuery } from '@apollo/client';
import { GET_PINGS_WITHIN_RADIUS } from '@app/graphql/location.query';
import { featureCollection, point } from '@turf/helpers';
import { useEffect, useState } from 'react';

export const useNearbyPing = () => {
  const [result, setResult] = useState<GeoJSON.FeatureCollection>();

  const { data: queryData, error } = useQuery(GET_PINGS_WITHIN_RADIUS, {
    variables: {
      payload: {
        latitude: '51.40891902233375',
        longitude: -0.262499258435156,
        radius: 200,
      },
      first: 10,
    },
  });

  useEffect(() => {
    if (queryData?.getPingsWithinRadius) {
      console.log('total pings', queryData?.getPingsWithinRadius.totalCount);
    }
    const fetchData = async () => {
      // Simulate an asynchronous operation (e.g., fetching data)
      const collection = await new Promise<GeoJSON.FeatureCollection>(
        resolve => {
          setTimeout(() => {
            // Resolve with an array of strings after the specified delay
            const data: { point: number[]; id: string }[] = [
              {
                point: [-0.262499258435156, 51.40891902233375],
                id: 'abc',
              },
              { point: [-0.2658306472791878, 51.40989205909267], id: 'bcd' },
              // [-0.27901123026694563, 51.40450449136861],
              // [-0.2540504538884818, 51.409100150458926],
            ];

            const features = data.map((item, index) => {
              let afeature = point(item.point);
              afeature.id = `${index}`;
              afeature.properties = {
                icon: item.id,
              };
              return afeature;
            });

            const aCollection = featureCollection(features);

            resolve(aCollection);
          }, 200);
        },
      );

      setResult(collection);
    };

    fetchData();
  }, [queryData?.getPingsWithinRadius]);

  return result;
};
