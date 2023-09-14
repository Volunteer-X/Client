import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, MD3Colors, Text } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import { AppTheme } from '@app/theme';
import useAppTheme from '@hooks/useAppTheme';
import { AppMediaTypes, SIZES } from '@app/lib';

const mediaTypes = [
  { icon: 'camera', label: AppMediaTypes.CAMERA },
  { icon: 'video-image', label: AppMediaTypes.MEDIA },
  // { icon: 'image', label: AppMediaTypes.IMAGE },
  // { icon: 'play-circle-outline', label: AppMediaTypes.VIDEO },
  { icon: 'link', label: AppMediaTypes.URL },
] as const;

export interface MediaResponse extends ImagePickerResponse {
  isUrl?: boolean;
}

export const MediaTypeView = React.forwardRef(
  (
    {
      size = SIZES.xLarge,
      enableLabel = false,
      onResponse,
    }: {
      size?: number;
      enableLabel?: boolean;
      onResponse?: (response: MediaResponse) => void;
    },
    ref: React.Ref<{ getResponse: () => MediaResponse }>,
  ) => {
    const { theme } = useAppTheme();

    const styles = makeStyles(theme);

    const [mediaResponse, setResponse] = useState<MediaResponse>({
      isUrl: false,
    });

    useImperativeHandle(ref, () => ({
      getResponse: () => mediaResponse,
    }));

    const handleOnPress = async (type: AppMediaTypes) => {
      const mediaOptions: Partial<ImageLibraryOptions> = {
        assetRepresentationMode: 'compatible',
        presentationStyle: 'currentContext',
        selectionLimit: 10,
        quality: 1,
      };
      const camerOptions: Partial<CameraOptions> = {
        durationLimit: 60,
        cameraType: 'back',
      };
      switch (type) {
        case AppMediaTypes.CAMERA:
          setResponse({
            ...(await launchCamera({
              ...camerOptions,
              mediaType: 'photo',
            })),
            isUrl: false,
          });

          break;
        case AppMediaTypes.MEDIA:
          setResponse({
            ...(await launchImageLibrary({
              ...mediaOptions,
              mediaType: 'mixed',
            })),
            isUrl: false,
          });

          break;
        case AppMediaTypes.URL:
          setResponse({ isUrl: true });
          break;
        /*
        Todo change if decided to make video and image different
      */
        // case AppMediaTypes.IMAGE:
        //   setResponse({
        //     ...(await launchImageLibrary({
        //       ...mediaOptions,
        //       mediaType: 'photo',
        //     })),
        //     isUrl: false,
        //   });
        //   break;
        // case AppMediaTypes.VIDEO:
        //   setResponse({
        //     ...(await launchImageLibrary({
        //       ...mediaOptions,
        //       mediaType: 'video',
        //     })),
        //     isUrl: false,
        //   });
        //   break;
      }
    };

    const _onResponse = useCallback(
      (response: MediaResponse) => {
        onResponse?.(response);
      },
      [onResponse],
    );

    useEffect(() => {
      _onResponse(mediaResponse);
    }, [_onResponse, mediaResponse]);

    return (
      <>
        {mediaTypes.map(mediaType => (
          <View style={styles.mediaTypeContainer} key={mediaType.label}>
            <IconButton
              icon={mediaType.icon}
              iconColor={theme.dark ? MD3Colors.neutral60 : MD3Colors.neutral40}
              size={size}
              style={styles.mediaTypeIcon}
              onPress={() => handleOnPress(mediaType.label)}
            />
            {enableLabel && (
              <Text variant="labelMedium" style={styles.mediaTypeText}>
                {mediaType.label}
              </Text>
            )}
          </View>
        ))}
      </>
    );
  },
);

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    mediaTypeText: {
      fontWeight: '500',
      color: MD3Colors.neutral70,
      letterSpacing: 1.2,
      textTransform: 'capitalize',
    },
    mediaTypeIcon: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.dark ? MD3Colors.neutral10 : MD3Colors.neutral80,
    },
    mediaTypeContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 100,
      gap: 3,
    },
  });
