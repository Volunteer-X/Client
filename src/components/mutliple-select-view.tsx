import React from 'react';
import { Picks, Pick } from '@app/lib';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Modify } from '@app/types/utility-types';
import { PicksChip } from './chips';
import { Chip } from 'react-native-paper';

type RemovedProps = {
  data: Array<Pick>;
  renderItem?: ListRenderItem<Pick>;
};

type Props = {
  chipStyle?: StyleProp<ViewStyle>;
  chipTextStyle?: StyleProp<TextStyle>;
};

type EnhancedProps = Modify<FlatListProps<Pick>, RemovedProps, Props>;

export const MultiSelectView = ({
  chipStyle,
  chipTextStyle,
  ...flatListProps
}: EnhancedProps) => {
  const renderItem: ListRenderItem<Pick> = ({ item, index }) => {
    const { label, icon } = item;

    const isSelected = Picks.filter(i => i.label === label).length > 0;

    return (
      <Chip
        mode={isSelected ? 'flat' : 'outlined'}
        onPress={() => {
          console.log(label);
        }}>
        {label}
      </Chip>
    );
  };

  return (
    <>
      <FlatList
        data={Picks}
        renderItem={renderItem}
        keyExtractor={(item: Pick) => `Key-${item.label}`}
        {...flatListProps}
      />
    </>
  );
};
