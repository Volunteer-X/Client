import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PING, UPDATE_PING } from '../graphQL/ping.mutation';
import { MediaInput } from '../../../__generated__/gql/graphql';
import { useAppSelector } from '@app/hooks';
import { Point } from '@app/types/utility-types';
import { Asset } from 'react-native-image-picker';
import { useS3Upload } from './useS3Upload';

type Input = {
  title: string; // required
  picks: Array<string>; // required
  point: Point; // required
  description?: string; // optional
  url?: string; // optional
  assets?: Array<Asset>; // optional
};

export const useCreatePing = () => {
  const [
    createPingMutation,
    { loading: mutationLoading, data, error: mutationError },
  ] = useMutation(CREATE_PING);

  const [
    updatePing,
    { loading: updateLoading, data: updateData, error: updateError },
  ] = useMutation(UPDATE_PING);

  const { isUploading: s3Loading, uploadFiles, error: s3Error } = useS3Upload();

  const user = useAppSelector(state => state.root.auth.user);

  const createPing = async ({
    title,
    description,
    picks,
    point,
    url,
    assets,
  }: Input) => {
    if (!user?.id) {
      throw new Error('User not logged in');
    }

    // * handle url text https situtation

    try {
      const response = await createPingMutation({
        variables: {
          createPingInput: {
            userID: user?.id,
            title,
            description,
            picks,
            latitude: point.lat,
            longitude: point.lng,
            url,
          },
        },
      });

      // console.log('Ping created successfully , ID', response.data?.createPing);

      const pingID = response.data?.createPing;

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
                  updatePingInput: {
                    id: pingID,
                    media: results as Array<MediaInput>,
                  },
                },
              }).catch(error => {
                console.log('Error updating ping with media', error);
              });
            })
            .catch(error => {
              console.log('Error uploading files to S3', error);
            });
        }
      }

      // return pingID;
    } catch (error) {
      throw new Error(`Error creating ping: ${error}`);
    }
  };

  return {
    createPing,
    loading: mutationLoading || s3Loading || updateLoading,
    data,
    error: mutationError || s3Error || updateError,
  };
};
