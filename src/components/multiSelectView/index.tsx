import React, { useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export type Data = {
  index: number;
  label: string;
};

type Props = {
  data: Array<Data>;
  renderItem: ListRenderItem<Data>;
  activeIcon: React.JSX.Element;
  inactiveIcon: React.JSX.Element;
};

const MultiSelectView: React.FC<Props> = ({
  data,
  renderItem,
  activeIcon,
  inactiveIcon,
}) => {
  const [selectItems, setSelectedItems] = useState([]);

  const onSelectItemsChange = _selectItems => {
    setSelectedItems(_selectItems);
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.index.toString()}
      />
    </>
  );
};

export default MultiSelectView;
