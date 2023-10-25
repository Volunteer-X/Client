import React, { useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { PicksChip } from '@components/chips';
import { Pick, Picks } from '@app/lib/constants/picks';

type Modify<T, R, S> = Omit<T, keyof R> & S;

type RemovedProps = {
  data: Array<Pick>;
  renderItem?: ListRenderItem<Pick>;
};

type Props = {
  selectedPicks: (selectedPicks: Array<string>) => void;
  chipTextStyle?: StyleProp<TextStyle>;
  chipStyle?: StyleProp<ViewStyle>;
};

type EnhancedProps = Modify<FlatListProps<Pick>, RemovedProps, Props>;

/*
 * TODO: Long press display information setting
 */
export const PicksSelectView = ({
  selectedPicks,
  chipStyle,
  chipTextStyle,
  ...flatListProps
}: EnhancedProps) => {
  const [picks, setPicks] = useState(Picks);

  const onSelectItemsChange = (index: number) => {
    picks[index].isSelected = !picks[index].isSelected;
    setPicks([...picks]);
  };

  useEffect(() => {
    selectedPicks(
      picks.filter(item => item.isSelected).map(item => item.label),
    );

    return () => {};
  }, [picks, selectedPicks]);

  const renderItem: ListRenderItem<Pick> = ({ item, index }) => (
    <PicksChip
      onSelection={onSelectItemsChange}
      index={index}
      datum={item}
      chipStyle={chipStyle}
      chipTextStyle={chipTextStyle}
    />
  );

  return (
    <>
      <FlatList
        data={picks}
        renderItem={renderItem}
        keyExtractor={item => `Key-${item.label}`}
        {...flatListProps}
      />
    </>
  );
};
