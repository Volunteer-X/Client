import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, MD3Colors, Text } from 'react-native-paper';
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
] as const;

export const MediaTypeView = React.forwardRef(
  (
    {
      size = SIZES.xLarge,
      enableLabel = false,
      onResponse,
      disabled = false,
    }: {
      size?: number;
      enableLabel?: boolean;
      disabled?: boolean;
      onResponse?: (response: ImagePickerResponse) => void;
    },
    ref: React.Ref<{ getResponse: () => ImagePickerResponse }>,
  ) => {
    const { theme } = useAppTheme();

    const styles = makeStyles(theme);

    const [mediaResponse, setResponse] = useState<ImagePickerResponse>({});

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
          setResponse(
            await launchCamera({
              ...camerOptions,
              mediaType: 'photo',
            }),
          );

          break;
        case AppMediaTypes.MEDIA:
          setResponse(
            await launchImageLibrary({
              ...mediaOptions,
              mediaType: 'mixed',
            }),
          );

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
      (response: ImagePickerResponse) => {
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
              iconColor={disabled ? MD3Colors.error0 : MD3Colors.neutral60}
              size={size}
              style={styles.mediaTypeIcon}
              onPress={() => handleOnPress(mediaType.label)}
              disabled={disabled}
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
