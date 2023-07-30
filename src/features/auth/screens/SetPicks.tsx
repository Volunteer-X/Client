import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/type';
import { PicksChip } from '../../../components/chips';

type Props = StackScreenProps<AuthStackParamList, 'SetPicks'>;

type Picks = {
  label: string;
  icon?: string;
};

const SetPicks = ({
  theme,
  route,
  navigation,
}: {
  theme: any;
  route: Props['route'];
  navigation: Props['navigation'];
}) => {
  const styles = makeStyles(theme);

  const renderItem: ListRenderItem<Picks> = ({ item, index }) => (
    <PicksChip label={item.label} />
  );

  return (
    <View>
      <Text>{route.params.username}</Text>
      <FlatList
        data={}
        keyExtractor={item => item.label}
        renderItem={renderItem}
      />
    </View>
  );
};

export default withTheme(SetPicks);

const makeStyles = (theme: any) => {
  StyleSheet.create({});
};
