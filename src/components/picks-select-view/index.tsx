import React, { useState } from 'react';
import {
  FlatList,
  FlatListComponent,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

import { PicksChip } from '@components/chips';

export type PicksSelectProps = {
  index: number;
  label: string;
  isSelected: boolean;
};

// interface Props<T> extends FlatListProps<T extends MultiSelectDatum ? T : any> {
//   data: Array<T extends MultiSelectDatum ? T : any>;
//   renderItem: ListRenderItem<T extends MultiSelectDatum ? T : any>;
//   activeIcon?: React.JSX.Element;
//   inactiveIcon?: React.JSX.Element;
// }

interface Props extends FlatListProps<PicksSelectProps> {
  data: Array<PicksSelectProps>;
}

const PicksSelectView = ({ data, ...flatListProps }: Props) => {
  const [selectItems, setSelectedItems] = useState(Array<PicksSelectProps>);

  const onSelectItemsChange = (item: PicksSelectProps, index: number) => {
    const _data: Array<PicksSelectProps> = data.map(_item =>
      _item.index == item.index
        ? { ..._item, isSelected: true }
        : { ..._item, isSelected: false },
    );

    setSelectedItems(_data);
  };

  const renderItem: ListRenderItem<PicksSelectProps> = ({ item, index }) => (
    <PicksChip
      label={item.label}
      onSelection={onSelectItemsChange}
      index={index}
      icon={item.icon}
      isSelected={item.isSelected}
    />
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.index.toString()}
        {...flatListProps}
      />
    </>
  );
};

export default PicksSelectView;
