import { DEV_FILE } from '@env';
import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '.';

type Media = {
  __typename?: 'Media' | undefined;
  key: string;
  type: string;
} | null;

export const useS3Download = () => {
  const [isDownloading, setIsDownloading] = useState(true);
  const [urls, setUrls] = useState<
    { uri: string; type: string }[] | undefined
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

        return response.data.uri;
      } catch (error) {
        throw new Error(`Error getting download url: ${error}`);
      }
    },
    [accessToken],
  );

  const downloadFile = async (media: Media) => {
    try {
      if (media) {
        const download = await getS3DownloadUrl(
          media?.type ?? '',
          media?.key ?? '',
        );

        // console.log('download', download);

        return download;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadFiles = async (medias: Media[]) => {
    setIsDownloading(true);
    try {
      const download = medias.map(media =>
        getS3DownloadUrl(media?.type ?? '', media?.key ?? ''),
      );

      const results = await Promise.all(download);

      console.log('results', results);

      // setUrls(results);

      return results;
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  // useEffect(() => {
  //   handleDownload();
  // }, [handleDownload, isDownloading]);

  return { isDownloading, urls, downloadFiles, downloadFile };
};
