import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  withTheme,
  Chip,
  Divider,
  TextInput,
  HelperText,
  MD3Colors,
  IconButton,
} from 'react-native-paper';

import { ImagePickerResponse, Asset } from 'react-native-image-picker';

import { PingFinalStepNavProp } from '@app/types/type';
import { AppTheme } from '@app/theme';
import useAppTheme from '@hooks/useAppTheme';
import { PicksLabel, SIZES } from '@app/lib';
import GoogleStaticMaps from '@components/google-static-map';
import { MAP_API_KEY } from '@env';

import { MediaTypeView } from '@app/components';
import { MediaFlatlist } from '@app/components/swiper-flatlist';
import { loremIpsum } from '@app/lib/constants/values';

const { height, width } = Dimensions.get('window');

export const PingFinalPage = () => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  const mediaTypeRef = useRef<{ getResponse: () => ImagePickerResponse }>(null);

  const [assets, setAssets] = useState<Array<Asset>>();
  const [showUrl, setShowUrl] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [location, setLocation] = useState();

  const textInputProps = {
    contentStyle: styles.textInputContent,
    underlineColor: 'transparent',
    activeUnderlineColor: 'transparent',
    cursorColor: theme.colors.primary,
    placeholderTextColor: theme.colors.onSurfaceDisabled,
    textColor: theme.colors.onSurface,
  };

  const navigation = useNavigation<PingFinalStepNavProp>();

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
        setAssets(newAssets);
      }
    },
    [setAssets],
  );

  useEffect(() => {
    if (showUrl || (assets && assets?.length > 0)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [assets, showUrl]);

  return (
    <View style={styles.superContainer}>
      <StatusBar backgroundColor={MD3Colors.neutral0} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Picks */}
          <View style={[styles.subContainer, styles.picksContainer]}>
            {/* <Text variant="titleLarge" style={styles.pickTitle}>
              Picks
            </Text> */}
            <View style={styles.picksHorizontalContainer}>
              <Chip
                icon="home"
                selected
                showSelectedOverlay
                style={styles.chip}
                mode="outlined">
                {PicksLabel.Technology}
              </Chip>
              <Chip
                icon="home"
                selected
                showSelectedOverlay
                style={styles.chip}
                mode="outlined">
                {PicksLabel.Art}
              </Chip>
              <Chip
                icon="home"
                selected
                showSelectedOverlay
                style={styles.chip}
                mode="outlined">
                {PicksLabel.Children}
              </Chip>
              <Chip
                icon="home"
                selected
                showSelectedOverlay
                style={styles.chip}
                mode="outlined">
                {PicksLabel.Disaster}
              </Chip>
              <Chip
                icon="home"
                style={styles.chip}
                mode="outlined"
                selected
                showSelectedOverlay
                compact>
                {PicksLabel.Environment}
              </Chip>
              <Chip icon="plus" style={styles.chip} mode="outlined">
                {'Add more'}
              </Chip>
            </View>
          </View>

          {/* Media */}
          <View style={[{ borderRadius: SIZES.xSmall }]}>
            <MediaFlatlist assets={assets} paddingOffset={SIZES.medium} />
          </View>

          {/* Text & URL */}
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
                    icon="close"
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
                // * navigates to search location screen
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
        </View>
      </ScrollView>
      {/* Media Selections */}
      <View style={styles.mediaContainer}>
        {/* Link | Image | Video | Files */}
        <MediaTypeView
          ref={mediaTypeRef}
          onResponse={response => _onMediaTypeResponse(response)}
          disabled={disabled}
        />
        <IconButton
          icon="link"
          iconColor={theme.dark ? MD3Colors.neutral60 : MD3Colors.neutral40}
          size={SIZES.xLarge}
          style={styles.mediaTypeIcon}
          onPress={() => {
            setShowUrl(true);
          }}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    superContainer: {
      flex: 1,
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
    },
    container: {
      paddingHorizontal: SIZES.medium,
      flex: 1,
      paddingVertical: 10,
      gap: 10,
    },
    subContainer: {
      padding: 10,
      borderRadius: 10,
      gap: 1.5,

      // ! Change
      backgroundColor: theme.dark ? MD3Colors.neutral10 : MD3Colors.neutral90,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontWeight: 'bold',
      letterSpacing: 2.5,
    },
    pickTitle: {
      fontWeight: '600',
      letterSpacing: 1.1,
    },
    picksContainer: {
      gap: 10,
    },
    picksHorizontalContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      paddingHorizontal: 2.5,
      paddingVertical: 5,
      marginRight: 7.5,
      marginVertical: 5,
    },
    textInput: {
      backgroundColor: 'transparent',
    },
    textArea: {
      minHeight: height / 5,
    },
    textInputContent: {},
    mapContainerStyle: {
      flex: 1,
      height: height * 0.15,
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
