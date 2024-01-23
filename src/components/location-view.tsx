import GoogleStaticMaps from '@app/components/google-static-map';
import useAppTheme from '@app/hooks/useAppTheme';
import { DIMENSIONS } from '@app/lib';
import { AppTheme } from '@app/theme';
import { Position } from '@turf/helpers';
import React, { StyleSheet, View } from 'react-native';
import { MD3Colors, Text } from 'react-native-paper';

export const LocationView = ({
  place,
  position,
}: {
  place: string;
  position: Position;
}) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <View style={[styles.subContainer, { padding: 0 }]}>
      <View style={styles.locationLabel}>
        <Text>
          <Text variant="bodyLarge">Change location </Text>
          <Text variant="bodySmall" style={{ color: MD3Colors.neutral50 }}>
            (Optional)
          </Text>
        </Text>
        <Text variant="bodySmall" style={styles.selectedPlace}>
          {place}
        </Text>
      </View>

      <GoogleStaticMaps
        containerStyle={styles.mapContainerStyle}
        center={position}
        size={{ height: 600, width: 300 }}
        zoom={12}
        markers={[{ location: position, size: 'small', color: 'black' }]}
        // apiKey={MAP_API_KEY}
      />
    </View>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    subContainer: {
      padding: 10,
      borderRadius: 10,
      gap: 1.5,

      // ! Change
      backgroundColor: theme.dark ? MD3Colors.neutral10 : MD3Colors.neutral90,
    },
    mapContainerStyle: {
      flex: 1,
      height: DIMENSIONS.fullHeight * 0.15,
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
    },
    locationLabel: {
      padding: 10,
    },
    selectedPlace: {
      color: MD3Colors.neutral60,
      fontWeight: '700',
    },
  });
