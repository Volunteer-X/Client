import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { Asset } from 'react-native-image-picker';

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
    baseURL: 'http://192.168.1.222:3550/',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const getSignedUrl = async () => {
    try {
      const response = await axios.get<URIResponse>('signedUrl', options);

      return response.data;
    } catch (error) {
      setSigningError(error);
      throw new Error(`Error getting signed URL: ${error}`);
    }
  };

  const uploadFile = async ({ fileName, base64 }: Asset) => {
    try {
      if (!fileName) {
        throw new Error('File name is required');
      }
      if (!base64) {
        throw new Error('Base64 is required');
      }

      const { signedUrl, Key } = await getSignedUrl();

      await axios.put(signedUrl, base64, {
        headers: {
          'Content-Type': 'application/octet-stream; charset=utf-8',
          'Content-Length': base64.length,
          'Content-Encoding': 'base64',
          // 'x-amz-acl': 'bucket-owner-full-control',
        },
      });

      console.log('File upload success', Key);

      return Key;
    } catch (error) {
      setUploadError(error);
      console.error('Error uploading file to S3:', error);
    }
  };

  const uploadFiles = async (assets: Array<Asset>) => {
    setIsUploading(true);
    try {
      const uploadPromises = assets.map(asset => uploadFile(asset));
      const keys = await Promise.all(uploadPromises);

      console.log('All files uploaded successfully', keys);

      return keys;
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
