import React from 'react';
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Chip } from 'react-native-paper';

import useAppTheme from '@hooks/useAppTheme';
import { AppTheme } from '@theme/index';
import { Pick } from '@app/lib/constants/picks';

export type ChipProps = {
  datum: Pick;
  index: number;
  onSelection: (index: number) => void;
  chipTextStyle?: StyleProp<TextStyle>;
  chipStyle?: StyleProp<ViewStyle>;
};

const PicksChip = ({
  index,
  datum,
  onSelection,
  chipTextStyle,
  chipStyle,
}: ChipProps) => {
  const { theme } = useAppTheme();
  const style = makeStyles(theme);

  const { isSelected, label, icon } = datum;

  return (
    <>
      <Chip
        textStyle={chipTextStyle ? chipTextStyle : style.textStyle}
        style={chipStyle ? chipStyle : style.chipStyle}
        icon={icon}
        mode={isSelected ? 'flat' : 'outlined'}
        selected={isSelected}
        onPress={() => onSelection(index)}>
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
