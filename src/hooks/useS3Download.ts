import { DEV_FILE } from '@env';
import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '.';

type Media = {
  __typename?: 'Media' | undefined;
  key: string;
  type: string;
} | null;

export const useS3Download = (medias: Media[]) => {
  const [isDownloading, setIsDownloading] = useState(true);
  const [urls, setUrls] = useState<
    { uri: string; key: string }[] | undefined
  >();

  const accessToken = useAppSelector(state => state.root.auth.accessToken);

  const getS3DownloadUrl = useCallback(
    async (type: string, key: string) => {
      //   console.log('getS3DownloadUrl', type, key);

      try {
        const response: AxiosResponse<{ uri: string }> = await axios.get(
          `download?type=${encodeURIComponent(type)}&Key=${encodeURIComponent(
            key,
          )}`,
          {
            method: 'GET',
            baseURL: DEV_FILE,
            headers: {
              'Content-Type': type,
              Authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
          },
        );

        return { uri: response.data.uri, key };
      } catch (error) {
        throw new Error(`Error getting download url: ${error}`);
      }
    },
    [accessToken],
  );

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      const download: Promise<{ uri: string; key: string }>[] = medias.map(
        media => {
          console.log('media', media);
          if (media !== undefined && media !== null) {
            return getS3DownloadUrl(media.type, media.key);
          }
          return new Promise<{ uri: string; key: string }>(resolve =>
            resolve({ uri: '', key: '' }),
          );
        },
      );

      const results = await Promise.all(download);

      setUrls(results.filter(Boolean));
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  }, [getS3DownloadUrl, medias]);

  useEffect(() => {
    handleDownload();
  }, [handleDownload, isDownloading]);

  return { isDownloading, urls };
};
