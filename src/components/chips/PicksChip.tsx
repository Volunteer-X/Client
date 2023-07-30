import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, withTheme } from 'react-native-paper';

export type PicksProps = {
  index?: number;
  label: string;
  icon?: string;
  isSelected?: boolean;
  onSelection: Function;
};

const PicksChip = ({
  theme,
  index,
  label,
  icon,
  isSelected,
  onSelection,
}: {
  theme: any;
  index: PicksProps['index'];
  label: PicksProps['label'];
  icon: PicksProps['icon'];
  isSelected: PicksProps['isSelected'];
  onSelection: PicksProps['onSelection'];
}) => {
  const style = makeStyles(theme);
  return (
    <>
      <Chip
        textStyle={style.textStyle}
        style={style.chipStyle}
        mode={isSelected ? 'flat' : 'outlined'}
        selected={isSelected}
        onPress={() => {
          onSelection(index, label);
        }}>
        {label}
      </Chip>
    </>
  );
};

export default withTheme(PicksChip);

const makeStyles = theme =>
  StyleSheet.create({
    textStyle: {
      fontSize: 13,
    },
    chipStyle: { marginHorizontal: 2, marginTop: 5 },
  });
