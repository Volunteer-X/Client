import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { Asset } from 'react-native-image-picker';

type URIResponse = {
  fileKey: string;
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

  const getSignedUrl = async (fileName: string) => {
    try {
      const response = await axios.get<URIResponse>(fileName, options);

      return response.data;
    } catch (error) {
      setSigningError(error);
      throw new Error(`Error getting signed URL: ${error}`);
    }
  };

  const uploadFile = async ({ fileName, base64 }: Asset): Promise<void> => {
    setIsUploading(true);

    try {
      if (!fileName) {
        throw new Error('File name is required');
      }
      if (!base64) {
        throw new Error('Base64 is required');
      }

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
      setUploadError(error);
      console.error('Error uploading file to S3:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadFile,
    error: uploadError || signingError,
  };
};
