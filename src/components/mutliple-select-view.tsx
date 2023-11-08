import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Pick, Picks } from '@app/lib/constants/picks';
import { PickChip } from './chips/NewChip';

type Modify<T, R, S> = Omit<T, keyof R> & S;

type RemovedProps = {
  renderItem?: ListRenderItem<Pick>;
};

type Props = {
  data?: Array<Pick>;
  selectedPicks: Array<string>;
  onPickSelect: (selectedPicks: string[]) => void;
  chipTextStyle?: StyleProp<TextStyle>;
  chipStyle?: StyleProp<ViewStyle>;
};

type EnhancedProps = Modify<FlatListProps<Pick>, RemovedProps, Props>;

/*
 * TODO: Long press display information setting
 */
export const MultiSelectView = ({
  data,
  selectedPicks,
  onPickSelect,
  ...flatListProps
}: EnhancedProps) => {
  const toggleSelection = (label: string) => {
    if (selectedPicks.includes(label)) {
      onPickSelect(selectedPicks.filter(val => val !== label));
    } else {
      onPickSelect([...selectedPicks, label]);
    }
  };

  const renderItem: ListRenderItem<Pick> = ({ item }) => {
    item.isSelected = selectedPicks.includes(item.label);

    return (
      <>
        <PickChip
          pick={item}
          onSelect={toggleSelection}
          onDeselect={toggleSelection}
        />
      </>
    );
  };

  return (
    <>
      <FlatList
        data={Picks}
        renderItem={renderItem}
        keyExtractor={item => `Key-${item.label}`}
        {...flatListProps}
      />
    </>
  );
};
