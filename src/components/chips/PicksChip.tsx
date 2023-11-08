import React from 'react';
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Chip } from 'react-native-paper';

import useAppTheme from '@hooks/useAppTheme';
import { AppTheme } from '@theme/index';
import { Pick } from '@app/lib/constants/picks';

export type ChipProps = {
  pick: Pick;
  disabled?: boolean;
  onSelect: (pick: string) => void;
  onDeselect: (pick: string) => void;
  chipTextStyle?: StyleProp<TextStyle>;
  chipStyle?: StyleProp<ViewStyle>;
};

const PicksChip = ({
  pick,
  disabled,
  onSelect,
  onDeselect,
  chipTextStyle,
  chipStyle,
}: ChipProps) => {
  const { theme } = useAppTheme();
  const style = makeStyles(theme);

  const { isSelected, label, icon } = pick;

  const toggleSelection = () => {
    if (isSelected) {
      onDeselect(label);
    } else {
      onSelect(label);
    }
  };

  return (
    <>
      <Chip
        textStyle={chipTextStyle ? chipTextStyle : style.textStyle}
        style={chipStyle ? chipStyle : style.chipStyle}
        icon={icon}
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
  });
