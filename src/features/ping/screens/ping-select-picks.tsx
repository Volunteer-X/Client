import { StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import {
  Button,
  Divider,
  IconButton,
  MD3Colors,
  Text,
} from 'react-native-paper';
import { PicksSelectView } from '@app/components';
import { DIMENSIONS, PADDING, SIZES } from '@app/lib';
import { Defaults } from '@app/lib';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PingStackScreenProps } from '@app/types/type';
import { AppIcons } from '@app/theme/icon';

export const PingSelectPicks = () => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  const navigation =
    useNavigation<PingStackScreenProps<'SelectPicks'>['navigation']>();
  const route = useRoute<PingStackScreenProps<'SelectPicks'>['route']>();

  const [selectedPicks, setSelectedPicks] = useState<string[]>(() => {
    if (route.params && route.params.picks) {
      return route.params.picks;
    }

    return [];
  });

  const handlePickSelect = (pickLabels: string[]) => {
    setSelectedPicks(pickLabels);
  };

  /*
   * handle redux storing and handling
   * navigation to next step
   */
  const handleOnSubmtition = useCallback(() => {
    console.log('Pick Count', selectedPicks.length, selectedPicks);
    navigation.navigate('FinalPage', { picks: selectedPicks });
    // navigation.navigate('Body');
  }, [navigation, selectedPicks]);

  const handleOnCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderHeader = () => {
    return (
      <>
        <View style={styles.header}>
          <IconButton
            icon={AppIcons.CLOSE}
            size={SIZES.xLarge}
            onPress={handleOnCancel}
          />
          <Text variant="bodyLarge">Picks</Text>
          <Button
            disabled={
              selectedPicks.length < Defaults.MIN_NUM_PICKS_PER_PING ||
              selectedPicks.length > Defaults.MAX_NUM_PICKS_PER_PING
                ? true
                : false
            }
            mode="text"
            labelStyle={{ fontSize: SIZES.medium }}
            onPress={handleOnSubmtition}>
            Next
          </Button>
        </View>
      </>
    );
  };

  const renderFooter = useCallback(() => {
    return (
      <>
        <Divider style={styles.divider} />
        <View style={styles.helperContainer}>
          <Text variant="bodySmall" style={styles.helperText}>
            {'\u2022 You can press and hold to learn more about each picks.'}
          </Text>
          <Text variant="bodySmall" style={styles.helperText}>
            {`\u2022 A maximum of ${Defaults.MAX_NUM_PICKS_PER_PING} picks to get the best result.`}
          </Text>
          <Text variant="bodySmall" style={styles.helperText}>
            {'\u2022 Select at least one to proceed'}
          </Text>
        </View>
      </>
    );
  }, [styles.divider, styles.helperContainer, styles.helperText]);

  return (
    <View style={styles.superContainer}>
      <PicksSelectView
        key={'PingSelectPicks'}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.contentContainer}
        chipStyle={styles.chip}
        chipTextStyle={styles.chipText}
        selectedPicks={selectedPicks}
        onPickSelect={handlePickSelect}
      />
    </View>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    superContainer: {
      flex: 1,
      padding: PADDING.md,
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
    },
    columnWrapper: { flexWrap: 'wrap' },
    contentContainer: {
      height: '100%',
    },
    chipText: {
      fontSize: SIZES.medium,
    },
    chip: {
      height: 'auto',
      padding: 2.5,
      marginHorizontal: 2.5,
      marginVertical: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      width: DIMENSIONS.fullWidth - PADDING.md * 2,
    },
    divider: {
      marginVertical: 25,
    },
    helperContainer: { gap: 10 },
    helperText: {
      color: theme.colors.onBackground,
    },
  });
