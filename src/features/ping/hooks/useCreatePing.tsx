import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PING, UPDATE_PING } from '../graphQL/ping.mutation';
import { MediaInput } from '../../../__generated__/gql/graphql';
import { useAppSelector } from '@app/hooks';
import { Asset } from 'react-native-image-picker';
import { useS3Upload } from './useS3Upload';
import { Position } from '@turf/helpers';

type Input = {
  title: string; // required
  picks: Array<string>; // required
  point: Position; // required
  description?: string; // optional
  url?: string; // optional
  assets?: Array<Asset>; // optional
};

type Ping = {
  id: string;
  createdAt?: string | Date | null;
  title: string;
  description?: string | null;
  picks: Array<string>;
  latitude: number;
  longitude: number;
  media?: ({ key: string; type: string } | null)[] | null;
  user: {
    id: string;
    username: string;
    name?: { firstName: string; lastName: string } | null;
    picture?: string | null;
  };
};

export const useCreatePing = () => {
  const [ping, setPing] = useState<Ping>();

  const [
    createPingMutation,
    { loading: mutationLoading, data, error: mutationError },
  ] = useMutation(CREATE_PING);

  const [
    updatePing,
    { loading: updateLoading, data: updateData, error: updateError },
  ] = useMutation(UPDATE_PING);

  const { isUploading: s3Loading, uploadFiles, error: s3Error } = useS3Upload();

  const authUser = useAppSelector(state => state.root.auth.user);

  const createPing = async ({
    title,
    description,
    picks,
    point,
    url,
    assets,
  }: Input) => {
    if (!authUser?.id) {
      throw new Error('User not logged in');
    }

    // * handle url text https situtation

    try {
      const response = await createPingMutation({
        variables: {
          createPingInput: {
            userID: authUser?.id,
            title,
            description,
            picks,
            latitude: point[1].toString(),
            longitude: point[0],
            url,
          },
        },
      });

      // console.log('Ping created successfully , ID', response.data?.createPing);

      const pingID = response.data?.createPing?.id; // * get pingID

      if (pingID) {
        if (assets && assets.length > 0) {
          // * handle media upload
          // ? useS3Upload()

          console.log('Uploading files to S3');

          await uploadFiles(assets)
            .then(async results => {
              // * handle update ping with media

              await updatePing({
                variables: {
                  id: pingID,
                  UPingInput: {
                    media: results as Array<MediaInput>,
                  },
                },
              })
                .then(res => {
                  if (!res.data?.updatePing) {
                    throw new Error('Error updating ping with media');
                  }

                  const {
                    id,
                    createdAt,
                    title: _title,
                    description: _description,
                    picks: _picks,
                    latitude,
                    longitude,
                    media,
                    user,
                  } = res.data?.updatePing;

                  if (!user) {
                    throw new Error('Error updating ping with media');
                  }
                  const { id: userID, username, name, picture } = user;

                  const updatedPing = {
                    id,
                    createdAt,
                    title: _title,
                    description: _description,
                    picks: _picks,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude as string),
                    media,
                    user: {
                      id: userID,
                      username,
                      name,
                      picture,
                    },
                  };

                  console.log('Ping updated successfully', updatedPing);

                  setPing(updatedPing);
                })
                .catch(error => {
                  console.log('Error updating ping with media', error);
                });
            })
            .catch(error => {
              console.log('Error uploading files to S3', error);
            });
        }
      }
    } catch (error) {
      throw new Error(`Error creating ping: ${error}`);
    } finally {
      // * reset pingID
      return ping;
    }
  };

  return {
    createPing,
    loading: mutationLoading || s3Loading || updateLoading,
    data,
    error: mutationError || s3Error || updateError,
  };
};
