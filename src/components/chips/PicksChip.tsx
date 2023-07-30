import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip, withTheme } from 'react-native-paper';

export type PicksProps = {
  label: string;
  icon?: string;
  isSelected?: boolean;
  onSelect: Function;
};

const PicksChip = ({
  theme,
  label,
  icon,
  isSelected,
  onSelect,
}: {
  theme: any;
  label: PicksProps['label'];
  icon: PicksProps['icon'];
  isSelected: PicksProps['isSelected'];
  onSelect: PicksProps['onSelect'];
}) => {
  const style = makeStyles(theme);
  return (
    <>
      <Chip
        textStyle={{ fontSize: 13 }}
        style={{ marginHorizontal: 2, marginTop: 5 }}
        mode={isSelected ? 'flat' : 'outlined'}
        selected={isSelected}
        onPress={() => {
          onSelect(label);
        }}>
        {label}
      </Chip>
    </>
  );
};

export default withTheme(PicksChip);

const makeStyles = theme => {
  StyleSheet.create({});
};
