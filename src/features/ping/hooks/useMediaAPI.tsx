import { DEV_FILE_PATH, DEV_HOST } from '@env';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Asset } from 'react-native-image-picker';

type URIResponse = {
  fileKey: string;
  signedUrl: string;
};

export const useS3Upload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const options: AxiosRequestConfig = {
    method: 'GET',
    baseURL: 'http://192.168.1.222:3550/',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const getSignedUrl = async (fileName: string) => {
    try {
      const response = await axios.get<URIResponse>(fileName, options);

      return response.data;
    } catch (error) {
      throw new Error(`Error getting signed URL: ${error}`);
    }
  };

  const uploadFile = async ({
    fileName,
    base64,
    uri,
    type,
  }: Asset): Promise<void> => {
    setIsUploading(true);

    try {
      if (!fileName) {
        throw new Error('File name is required');
      }
      if (!base64) {
        throw new Error('Base64 is required');
      }

      console.log('fileExtension', type);

      const { signedUrl, fileKey } = await getSignedUrl(fileName);

      await axios.put(signedUrl, base64, {
        headers: {
          'Content-Type': 'application/octet-stream; charset=utf-8',
          'Content-Length': base64.length,
          'Content-Encoding': 'base64',
          // 'x-amz-acl': 'bucket-owner-full-control',
        },
      });

      console.log('File upload success', fileKey);
    } catch (error) {
      console.error('Error uploading file to S3:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadFile,
  };
};
