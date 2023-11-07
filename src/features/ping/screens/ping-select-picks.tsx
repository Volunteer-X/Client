import { StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import { Button, MD3Colors, Text } from 'react-native-paper';
import { MultiSelectView, PicksSelectView } from '@app/components';
import { DIMENSIONS, PADDING, SIZES } from '@app/lib';
import { Defaults } from '@app/lib/constants/values';
import { useNavigation } from '@react-navigation/native';
import { SelectPicksNavigationProp } from '@app/types/type';

export const PingSelectPicks = () => {
  const navigation = useNavigation<SelectPicksNavigationProp>();

  const [selectedPicks, setSelectedPicks] = useState<Array<string>>([]);

  const getSelectedPicks = useCallback((selectedPicks: Array<string>) => {
    setSelectedPicks(selectedPicks);
  }, []);

  /*
   * handle redux storing and handling
   * navigation to next step
   */
  const handleOnSubmtition = useCallback(() => {
    console.log('Pick Count', selectedPicks.length, selectedPicks);
    navigation.navigate('Body');
  }, [navigation, selectedPicks]);

  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            width: DIMENSIONS.fullWidth - PADDING.md,
          }}>
          <Text variant="bodyLarge">Picks</Text>
          <Button
            disabled={
              selectedPicks.length < Defaults.MIN_NUM_PICKS_PER_PING ||
              selectedPicks.length > Defaults.MAX_NUM_PICKS_PER_PING
                ? true
                : false
            }
            mode="text"
            onPress={handleOnSubmtition}>
            Next
          </Button>
        </View>
      </>
    );
  };

  const { theme } = useAppTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.superContainer}>
      <PicksSelectView
        // key={'PingSelectPicks'}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        contentContainerStyle={styles.contentContainer}
        // ListHeaderComponentStyle={styles.headerComponent}p
        // ListFooterComponentStyle={styles.footerComponent}
        chipStyle={styles.chip}
        chipTextStyle={styles.chipText}
        selectedPicks={getSelectedPicks}
      />
      <PicksSelectView
        // key={'PingSelectPicks1'}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        contentContainerStyle={styles.contentContainer}
        // ListHeaderComponentStyle={styles.headerComponent}p
        // ListFooterComponentStyle={styles.footerComponent}
        chipStyle={styles.chip}
        chipTextStyle={styles.chipText}
        selectedPicks={getSelectedPicks}
      />
      {/* <MultiSelectView /> */}
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
      alignItems: 'center',
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
  });
