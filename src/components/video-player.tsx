import React, { useCallback, useEffect, useState } from 'react';
import Video, { VideoProperties } from 'react-native-video';

interface VideoPlayerProps extends Omit<VideoProperties, 'source'> {
  timeStampMilliSec?: number;
  source: { uri?: string; headers?: { [key: string]: string } };
}

export const VideoPlayer = ({
  source,
  timeStampMilliSec = 10,
  ...props
}: VideoPlayerProps) => {
  /*
    ! Failure in implementing poster feature
 */
  /*   const [_poster, setPoster] = useState<string>();

  const getPoster = useCallback(async () => {
    let __poster;
    try {
      __poster = await createThumbnail({
        url: source.uri,
        timeStamp: timeStampMilliSec,
      });
    } catch (error) {
      console.error(error);
    }

    return __poster;
  }, [source, timeStampMilliSec]);

  useEffect(() => {
    getPoster().then(res => setPoster(res?.path));
    console.log('here');
  }, [getPoster]); */

  return (
    <>
      <Video
        source={source}
        // poster={_poster ? _poster : undefined}
        {...props}
      />
    </>
  );
};
