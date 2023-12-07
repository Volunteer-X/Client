import { getTypeFromMIME } from '@app/utils';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { Asset } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

type URIResponse = {
  Key: string;
  signedUrl: string;
};

export const useS3Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<any | unknown>();
  const [signingError, setSigningError] = useState<any | unknown>();

  const options: AxiosRequestConfig = {
    method: 'GET',
    baseURL: 'http://192.168.1.222:3550/api/v1/',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const getSignedUrl = async (type: string) => {
    console.log(type);

    try {
      const response: AxiosResponse<URIResponse> = await axios.get(
        encodeURIComponent(type),
        options,
      );

      return response.data;
    } catch (error) {
      setSigningError(error);
      throw new Error(`Error getting signed URL: ${error}`);
    }
  };

  const uploadFile = async ({ type, uri, fileSize }: Asset) => {
    try {
      if (!type) {
        throw new Error('File type is required');
      }

      if (!uri) {
        throw new Error('File uri is required');
      }

      const { signedUrl, Key } = await getSignedUrl(type);

      await RNFetchBlob.fetch(
        'PUT',
        signedUrl,
        {
          'Content-Type': type,
        },
        RNFetchBlob.wrap(uri),
      );

      console.log('File upload success', Key);

      return { key: Key, type: type };
    } catch (error) {
      setUploadError(error);
      console.error('Error uploading file to S3:', error);
    }
  };

  const uploadFiles = async (assets: Array<Asset>) => {
    setIsUploading(true);
    try {
      const uploadPromises = assets.map(asset => uploadFile(asset));
      const results = await Promise.all(uploadPromises);

      console.log('All files uploaded successfully', results);

      return results;
    } catch (error) {
      setUploadError(error);
      console.error('Error uploading files to S3:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadFiles,
    error: uploadError || signingError,
  };
};
