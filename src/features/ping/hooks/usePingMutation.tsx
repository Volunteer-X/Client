import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PING } from '../graphQL/ping.mutation';
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
  assets: Array<Asset>; // optional
};

export const usePingMutation = () => {
  const [
    createPingMutation,
    { loading: mutationLoading, data, error: mutationError },
  ] = useMutation(CREATE_PING);

  const { isUploading: s3Loading, uploadFiles, error: s3Error } = useS3Upload();

  const { id: userID } = useAppSelector(state => state.root.user);

  const createPing = async ({
    title,
    description,
    picks,
    point,
    url,
    assets,
  }: Input) => {
    try {
      const response = await createPingMutation({
        variables: {
          createPingInput: {
            userID,
            title,
            description,
            picks,
            latitude: point.lat,
            longitude: point.lng,
            url,
          },
        },
      });

      console.log('Ping created successfully', response);

      if (response.data?.createPing?.id) {
        if (assets && assets.length > 0) {
          // * handle media upload
          // ? useS3Upload()
          uploadFiles(assets);
        }
      }
      return response;
    } catch (error) {
      throw new Error(`Error creating ping: ${error}`);
    }
  };

  return {
    createPing,
    loading: mutationLoading || s3Loading,
    data,
    error: mutationError || s3Error,
  };
};
