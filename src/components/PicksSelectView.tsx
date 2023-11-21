import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { PicksChip } from '@components/chips';
import { Pick, Picks } from '@app/lib';

type Modify<T, R, S> = Omit<T, keyof R> & S;

type RemovedProps = {
  data: Array<Pick>;
  renderItem?: ListRenderItem<Pick>;
};

type Props = {
  max?: number;
  selectedPicks: Array<string>;
  onPickSelect: (selectedPicks: string[]) => void;
  chipTextStyle?: StyleProp<TextStyle>;
  chipStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
  extras?: { label: string; icon: string; isSelected: boolean }[];
};

type EnhancedProps = Modify<FlatListProps<Pick>, RemovedProps, Props>;

/*
 * TODO: Long press display information setting
 */
export const PicksSelectView = ({
  selectedPicks,
  onPickSelect,
  chipStyle,
  chipTextStyle,
  max,
  iconSize,
  extras,
  ...flatListProps
}: EnhancedProps) => {
  const _Picks = extras
    ? [
        ...Picks,
        ...extras.map(item => ({
          label: item.label,
          icon: item.icon,
          isSelected: item.isSelected,
        })),
      ]
    : Picks;

  const toggleSelection = (label: string) => {
    if (selectedPicks.includes(label)) {
      onPickSelect(selectedPicks.filter(val => val !== label));
    } else {
      onPickSelect([...selectedPicks, label]);
    }
  };

  const isDisabled = max ? selectedPicks.length > max : false;

  const renderItem: ListRenderItem<Pick> = ({ item }) => {
    item.isSelected = selectedPicks.includes(item.label);

    return (
      <PicksChip
        onSelect={toggleSelection}
        onDeselect={toggleSelection}
        pick={item}
        chipStyle={chipStyle}
        chipTextStyle={chipTextStyle}
        disabled={isDisabled}
        iconSize={iconSize}
      />
    );
  };

  return (
    <>
      <FlatList
        data={_Picks}
        renderItem={renderItem}
        keyExtractor={item => `Key-${item.label}`}
        {...flatListProps}
      />
    </>
  );
};
