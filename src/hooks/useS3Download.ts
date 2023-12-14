import { DEV_FILE } from '@env';
import axios, { AxiosResponse } from 'axios';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '.';

type Media = {
  __typename?: 'Media' | undefined;
  key: string;
  type: string;
} | null;

export const useS3Download = (media: Media) => {
  const [isDownloading, setIsDownloading] = useState(true);
  const [url, setUrl] = useState<string>();

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

  const downloadFile = useCallback(
    debounce(async () => {
      try {
        if (media) {
          const download = await getS3DownloadUrl(
            media?.type ?? '',
            media?.key ?? '',
          );

          // console.log('download', download);

          setUrl(download);

          return download;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsDownloading(false);
      }
    }, 500),
    [debounce, media, getS3DownloadUrl, setUrl, setIsDownloading],
  );

  useEffect(() => {
    downloadFile();
  }, [downloadFile, isDownloading]);

  return { isDownloading, url, downloadFile };
};
// const downloadFiles = async (medias: Media[]) => {
//   setIsDownloading(true);
//   try {
//     const download = medias.map(media =>
//       getS3DownloadUrl(media?.type ?? '', media?.key ?? ''),
//     );

//     const results = await Promise.all(download);

//     console.log('results', results);

//     // setUrls(results);

//     return results;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setIsDownloading(false);
//   }
// };
