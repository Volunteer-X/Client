import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { AppTheme } from '@app/theme';
import useAppTheme from '@app/hooks/useAppTheme';
import {
  Button,
  Divider,
  HelperText,
  IconButton,
  MD3Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import { DIMENSIONS, PADDING, SIZES } from '@app/lib';
import { loremIpsum } from '@app/lib/constants/values';
import GoogleStaticMaps from '@app/components/google-static-map';
import { MAP_API_KEY } from '@env';
import { MediaTypeView } from '@app/components';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { AppIcons } from '@app/theme/icon';

export const PingBody = () => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);
  const [showUrl, setShowUrl] = useState<boolean>(true);

  const navigation = useNavigation();

  const mediaTypeRef = useRef<{ getResponse: () => ImagePickerResponse }>(null);

  const textInputProps = {
    contentStyle: styles.textInputContent,
    underlineColor: 'transparent',
    activeUnderlineColor: 'transparent',
    cursorColor: theme.colors.primary,
    placeholderTextColor: theme.colors.onSurfaceDisabled,
    textColor: theme.colors.onSurface,
  };

  const _onMediaTypeResponse = useCallback(
    ({
      didCancel,
      errorCode,
      errorMessage,
      assets: newAssets,
    }: ImagePickerResponse) => {
      console.log('🚀 ~ file: PingA.tsx:56 ~ PingA ~ res:', newAssets);

      // * Do nothing on cancel
      if (didCancel) {
        return;
      }

      // Todo Handle on error
      if (errorCode && errorMessage) {
        console.error(errorCode, errorMessage);
        return;
      }

      /*
      Todo Handle different usecases
      * if user selects media again, concat new assets with old assets
      * check for repeated data
    */
      if (newAssets) {
        // setAssets(newAssets);
      }
    },
    [],
  );

  return (
    <View style={styles.superContainer}>
      <View style={styles.headerContainer}>
        {/* Back Button */}
        <IconButton
          icon={AppIcons.ARROW_BACK}
          size={SIZES.xLarge}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {/* Next Button */}
        <Button
          icon="chevron-right"
          onPress={() => {
            navigation.navigate('FinalPage');
          }}
          contentStyle={{ flexDirection: 'row-reverse' }}
          compact>
          Next
        </Button>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 10 }}>
        {/* Text and URL */}
        <View style={[styles.subContainer]}>
          <TextInput
            placeholder="An interesting title"
            style={styles.textInput}
            textContentType="none"
            textBreakStrategy="highQuality"
            dense
            {...textInputProps}
          />
          <HelperText type="error" visible>
            Required
          </HelperText>
          <Divider bold style={{ marginVertical: SIZES.xxSmall }} />
          {/* URL */}
          {showUrl && (
            <View>
              <View style={styles.urlContainer}>
                <TextInput
                  placeholder="Enter the website link"
                  style={[styles.textInput, { flex: 1 }]}
                  textContentType="URL"
                  // value="www.google.com/"
                  dense
                  {...textInputProps}
                />
                <IconButton
                  icon={AppIcons.CLOSE}
                  onPress={() => {
                    setShowUrl(false);
                  }}
                />
              </View>
              <Divider bold style={{ marginVertical: SIZES.xxSmall }} />
            </View>
          )}

          {/* Text Area */}
          <TextInput
            multiline
            placeholder="What's happening?"
            style={[styles.textInput, styles.textArea]}
            textContentType="none"
            textBreakStrategy="highQuality"
            value={loremIpsum}
            maxLength={500}
            dense
            {...textInputProps}
          />
          <HelperText type="info" visible style={{ textAlign: 'right' }}>
            500/500
          </HelperText>
        </View>
        {/* Location */}
        <View style={[styles.subContainer, { padding: 0 }]}>
          <View>
            <Pressable
              style={styles.locationLabel}
              onPress={() => navigation.navigate('SearchLocation')}>
              <Text>
                <Text variant="bodyLarge">Add location </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: MD3Colors.neutral50 }}>
                  (Optional)
                </Text>
              </Text>
            </Pressable>
          </View>

          <GoogleStaticMaps
            containerStyle={styles.mapContainerStyle}
            center="Brooklyn Bridge,New York,NY"
            size={{ height: 600, width: 300 }}
            zoom={13}
            onError={() => {}}
            onLoad={() => {}}
            apiKey={MAP_API_KEY}
          />
        </View>
      </ScrollView>
      {/* Media Selections */}
      <View style={styles.mediaContainer}>
        {/* Link | Image | Video | Files */}
        <MediaTypeView
          ref={mediaTypeRef}
          onResponse={response => _onMediaTypeResponse(response)}
          // disabled={disabled}
          disabled
        />
        <IconButton
          icon={AppIcons.LINK}
          iconColor={theme.dark ? MD3Colors.neutral60 : MD3Colors.neutral40}
          size={SIZES.xLarge}
          style={styles.mediaTypeIcon}
          onPress={() => {
            setShowUrl(true);
          }}
          // disabled={disabled}
        />
      </View>
    </View>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    superContainer: {
      flex: 1,
      paddingHorizontal: PADDING.sm,
      paddingVertical: PADDING.md,
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
    },
    subContainer: {
      padding: 10,
      borderRadius: 10,
      gap: 1.5,

      // ! Change
      backgroundColor: theme.dark ? MD3Colors.neutral10 : MD3Colors.neutral90,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInput: {
      backgroundColor: 'transparent',
    },
    textArea: {
      minHeight: DIMENSIONS.fullHeight / 5,
    },
    textInputContent: {},
    mapContainerStyle: {
      flex: 1,
      height: DIMENSIONS.fullHeight * 0.15,
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
    },
    locationLabel: {
      padding: 10,
    },
    mediaContainer: {
      paddingHorizontal: SIZES.medium,
      paddingVertical: 10,
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'flex-start',
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
      elevation: 5,
    },
    mediaTypeIcon: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.dark ? MD3Colors.neutral10 : MD3Colors.neutral80,
    },
    urlContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
