import React from 'react';
import { Chip } from '@rneui/themed';

type CharacterChipProps = {
  label: string;
  icon: string;
  isSelected: boolean | undefined;
  onSelect: Function;
};

const CharacterChip = ({
  label,
  icon,
  isSelected,
  onSelect,
}: CharacterChipProps) => {
  console.log(`rendering ${label}`);

  return (
    <>
      <Chip
        title={label}
        titleStyle={{ fontSize: 13 }}
        containerStyle={{ marginHorizontal: 2, marginTop: 5 }}
        type={isSelected ? 'solid' : 'outline'}
        icon={{
          name: icon,
          type: 'feather',
          size: 15,
        }}
        onPress={() => {
          onSelect(label);
        }}
      />
    </>
  );
};

export default CharacterChip;
