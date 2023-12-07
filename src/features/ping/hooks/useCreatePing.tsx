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
  assets?: Array<Asset>; // optional
};

export const useCreatePing = () => {
  const [
    createPingMutation,
    { loading: mutationLoading, data, error: mutationError },
  ] = useMutation(CREATE_PING);

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
      // const response = await createPingMutation({
      //   variables: {
      //     createPingInput: {
      //       userID: user?.id,
      //       title,
      //       description,
      //       picks,
      //       latitude: point.lat,
      //       longitude: point.lng,
      //       url,
      //     },
      //   },
      // });

      // console.log('Ping created successfully , ID', response.data?.createPing);

      // const pingID = response.data?.createPing;

      if (true) {
        if (assets && assets.length > 0) {
          // * handle media upload
          // ? useS3Upload()

          console.log('Uploading files to S3');

          try {
            const s3Response = await uploadFiles(assets);
            console.log('s3Response', s3Response);
          } catch (error) {
            console.log('s3Response error', error);
          }
        }
      }

      // return pingID;
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
