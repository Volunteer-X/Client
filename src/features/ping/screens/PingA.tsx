import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  withTheme,
  IconButton,
  Chip,
  Divider,
  TextInput,
  HelperText,
  MD3Colors,
} from 'react-native-paper';
import { PingANavProp } from '@ts-types/type';
import { AppTheme } from '@app/theme';
import useAppTheme from '@hooks/useAppTheme';
import { PicksLabel } from '@app/lib';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';
import GoogleStaticMaps from '@app/components/googleStaticMap';
import { MAP_API_KEY } from '@env';

const { height, width } = Dimensions.get('window');

const loremIpsum =
  'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or.';

const MediaTypeView = ({
  mediaTypes,
  style,
  size = 25,
  enableLabel = false,
}: {
  mediaTypes: Array<{ icon: IconSource; label: string }>;
  size?: number;
  style: any;
  enableLabel?: boolean;
}) => {
  const { theme } = useAppTheme();

  return (
    <>
      {mediaTypes.map(mediaType => (
        <View style={style.mediaTypeContainer} key={mediaType.label}>
          <IconButton
            icon={mediaType.icon}
            iconColor={theme.dark ? MD3Colors.neutral50 : MD3Colors.neutral40}
            size={size}
            style={style.mediaTypeIcon}
            onPress={() => {
              console.log(mediaType.label);
            }}
          />
          {enableLabel && (
            <Text variant="labelMedium" style={style.mediaTypeText}>
              {mediaType.label}
            </Text>
          )}
        </View>
      ))}
    </>
  );

  //   return (
  //     <>
  //       <View style={style.mediaTypeContainer}>
  //         <IconButton
  //           icon={icon}
  //           iconColor={MD3Colors.neutral50}
  //           size={size}
  //           style={style.mediaTypeIcon}
  //         />
  //         <Text variant="labelMedium" style={style.mediaTypeText}>
  //           {label}
  //         </Text>
  //       </View>
  //     </>
  //   );
};

const SIZE = {
  paddingHorizontal: 15,
};

const PingA = () => {
  const { theme } = useAppTheme();

  const styles = makeStyles(theme);
  const textInputProps = {
    contentStyle: styles.textInputContent,
    underlineColor: 'transparent',
    activeUnderlineColor: 'transparent',
    cursorColor: theme.colors.primary,
    placeholderTextColor: theme.colors.onSurfaceDisabled,
    textColor: theme.colors.onSurface,
  };

  let mediaTypes: Array<{ icon: string; label: string }> = [
    { icon: 'link', label: 'Links' },
    { icon: 'image', label: 'Images' },
    { icon: 'play-circle-outline', label: 'Videos' },
    { icon: 'file-document-outline', label: 'Files' },
  ];

  const navigation = useNavigation<PingANavProp>();

  return (
    <View style={styles.superContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Picks */}
          <View style={[styles.subContainer, styles.picksContainer]}>
            {/* <Text variant="titleLarge" style={styles.pickTitle}>
              Picks
            </Text> */}
            <View style={styles.picksHorizontalContainer}>
              <Chip icon="home" style={styles.chip} mode="outlined">
                {PicksLabel.Technology}
              </Chip>
              <Chip icon="home" style={styles.chip} mode="outlined">
                {PicksLabel.Art}
              </Chip>
              <Chip icon="home" style={styles.chip} mode="outlined">
                {PicksLabel.Children}
              </Chip>
              <Chip icon="home" style={styles.chip} mode="outlined">
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
            </View>
          </View>

          {/* Media */}

          {/* Text */}
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
            <Divider bold style={{ marginVertical: 5 }} />
            {/* Text Area */}
            <TextInput
              multiline
              placeholder="What's happening?"
              style={[styles.textInput, styles.textArea]}
              textContentType="none"
              textBreakStrategy="highQuality"
              value={loremIpsum}
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
              <TouchableOpacity>
                <Text variant="bodyLarge" style={styles.locationLabel}>
                  Add location
                </Text>
              </TouchableOpacity>
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
      {/* Media */}
      <View style={styles.mediaContainer}>
        {/* Link | Image | Video | Files */}
        <MediaTypeView mediaTypes={mediaTypes} style={styles} />
      </View>
    </View>
  );
};

export default withTheme(PingA);

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    superContainer: {
      flex: 1,
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
    },
    container: {
      paddingHorizontal: SIZE.paddingHorizontal,
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
    mediaTypeContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 100,
      gap: 3,
    },
    mediaTypeText: {
      fontWeight: '500',
      color: MD3Colors.neutral70,
      letterSpacing: 1.2,
    },
    mediaTypeIcon: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.dark ? MD3Colors.neutral20 : MD3Colors.neutral80,
    },
    mediaContainer: {
      paddingHorizontal: SIZE.paddingHorizontal,
      paddingVertical: 10,
      // borderTopStartRadius: 10,
      // borderTopEndRadius: 10,
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'flex-start',
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
      elevation: 5,
    },
    mapContainerStyle: {
      flex: 1,
      height: height * 0.15,
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
    },
    locationLabel: {
      padding: 10,
    },
  });
