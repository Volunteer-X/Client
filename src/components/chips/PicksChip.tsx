import React, { useCallback } from 'react';
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Chip } from 'react-native-paper';

import useAppTheme from '@hooks/useAppTheme';
import { AppTheme } from '@theme/index';
import { Pick } from '@app/lib/constants/picks';
import { PicksIcon } from '../picks-icon';

export type ChipProps = {
  pick: Pick;
  disabled?: boolean;
  onSelect?: (pick: string) => void;
  onDeselect?: (pick: string) => void;
  chipTextStyle?: StyleProp<TextStyle>;
  chipStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
};

const PicksChip = ({
  pick,
  disabled,
  onSelect = () => {},
  onDeselect = () => {},
  chipTextStyle,
  chipStyle,
  iconSize = 16,
}: ChipProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  const { isSelected, label, icon } = pick;

  const toggleSelection = () => {
    if (isSelected) {
      onDeselect(label);
    } else {
      onSelect(label);
    }
  };

  const pickIcon = useCallback(
    () => (
      <PicksIcon
        icon={icon}
        size={iconSize}
        containerStyle={styles.iconContainerStyle}
      />
    ),
    [icon, iconSize, styles.iconContainerStyle],
  );

  return (
    <>
      <Chip
        textStyle={chipTextStyle ? chipTextStyle : styles.textStyle}
        style={chipStyle ? chipStyle : styles.chipStyle}
        icon={pickIcon}
        mode={isSelected ? 'flat' : 'outlined'}
        selected={isSelected}
        onPress={toggleSelection}
        disabled={disabled}>
        {label}
      </Chip>
    </>
  );
};

export default PicksChip;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    textStyle: {
      fontSize: 13,
    },
    chipStyle: { marginHorizontal: 2, marginTop: 5 },
    iconContainerStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginHorizontal: 0,
      marginVertical: 0,
    },
  });
