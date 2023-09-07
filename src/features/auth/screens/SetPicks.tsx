import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Divider, Text, withTheme } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthStackParamList } from '@ts-types/type';
import PicksSelectView from '@app/components/PicksSelectView';
import { Defaults } from '@app/lib/constants/values';
import { AppTheme } from '@app/theme';

type Props = StackScreenProps<AuthStackParamList, 'SetPicks'>;

const { height, width } = Dimensions.get('window');

const SetPicks = ({
  theme,
  route,
  navigation,
}: {
  theme: any;
  route: Props['route'];
  navigation: Props['navigation'];
}) => {
  const selectedPicks = useRef<Array<string>>();
  const [canContinue, setCanContinue] = useState<boolean>(false);

  const username = route.params?.username;
  const styles = makeStyles(theme);

  const getSelectedPicks = useCallback((_selectedPicks: Array<string>) => {
    if (_selectedPicks.length < Defaults.MIN_NUM_PICKS) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
      selectedPicks.current = _selectedPicks;
    }
  }, []);

  const handleOnSubmition = () => {
    console.log(selectedPicks.current);
    navigation.navigate('LoadingScreen', {
      username,
      picks: selectedPicks.current,
    });
  };

  const renderHeader = useCallback(() => {
    return (
      <>
        <Text variant="titleMedium" style={styles.headerGreeting}>
          {`Hi, ${username}!`}
        </Text>
        <Text variant="displayMedium" style={styles.headerTitle}>
          Your picks
        </Text>
        <Text variant="titleMedium" style={styles.headerSubtitle}>
          Let us know what you would like to follow and engage on
        </Text>
      </>
    );
  }, [styles, username]);

  const renderFooter = useCallback(() => {
    return (
      <>
        <Divider style={styles.divider} />
        <View style={styles.helperContainer}>
          <Text variant="bodySmall" style={styles.helperText}>
            {'\u2022 You can press and hold to learn more about each picks.'}
          </Text>
          <Text variant="bodySmall" style={styles.helperText}>
            {`\u2022 A minimum of ${Defaults.MIN_NUM_PICKS} picks to get the best result.`}
          </Text>
          <Text variant="bodySmall" style={styles.helperText}>
            {'\u2022 You can select all the picks if you desire.'}
          </Text>
        </View>
        <Button
          mode="contained"
          disabled={!canContinue}
          uppercase
          style={styles.continueButton}
          contentStyle={styles.continueButtonContent}
          labelStyle={styles.continueButtonLabel}
          onPress={handleOnSubmition}>
          Continue
        </Button>
      </>
    );
  }, [canContinue, styles]);

  return (
    <View style={styles.container}>
      <PicksSelectView
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponentStyle={styles.headerComponent}
        ListFooterComponentStyle={styles.footerComponent}
        chipStyle={styles.chip}
        chipTextStyle={styles.chipText}
        selectedPicks={getSelectedPicks}
      />
    </View>
  );
};

export default withTheme(SetPicks);

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: { flex: 1 },
    contentContainer: {
      flex: 1,
      paddingHorizontal: width * 0.05,
    },
    headerComponent: {
      marginBottom: height * 0.025,
      gap: 10,
    },
    headerTitle: { fontWeight: 'bold' },
    headerGreeting: { fontWeight: '100' },
    headerSubtitle: { color: theme.colors.onSurfaceDisabled },
    footerComponent: { flex: 1 },
    continueButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      marginVertical: 35,
    },
    divider: {
      marginVertical: 25,
    },
    helperContainer: { gap: 10 },
    helperText: {
      color: theme.colors.onSurfaceDisabled,
    },
    continueButtonContent: {
      height: height * 0.065,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    continueButtonLabel: {
      fontSize: 18,
      padding: 0,
    },
    columnWrapper: { flexWrap: 'wrap' },
    chip: {
      paddingVertical: 3,
      paddingHorizontal: 1.5,
      margin: 3,
    },
    chipText: { fontSize: 14, fontWeight: '600' },
  });
