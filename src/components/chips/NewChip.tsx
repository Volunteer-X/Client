import { Pick } from '@app/lib';
import React from 'react';
import { Pressable, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';

type ChipProps = {
  pick: Pick;
  onSelect: (pick: string) => void;
  onDeselect: (pick: string) => void;
};

export const PickChip = ({ pick, onSelect, onDeselect }: ChipProps) => {
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
      <Pressable
        // mode={isSelected ? 'flat' : 'outlined'}

        style={{
          backgroundColor: isSelected ? 'blue' : 'red',
          padding: 10,
          margin: 1,
        }}
        // selected={isSelected}
        // icon={icon}
        onPress={toggleSelection}>
        <Text>{label}</Text>
      </Pressable>
    </>
  );
};
