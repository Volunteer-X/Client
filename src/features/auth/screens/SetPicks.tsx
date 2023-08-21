import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { Button, Text, withTheme } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthStackParamList } from '../../../types/type';
import { PICKS_DATA } from '@app/lib/index';
import { PicksChip } from '@components/chips/index';
import PicksSelectView, {
  PicksSelectProps,
} from '@components/picks-select-view';

type Props = StackScreenProps<AuthStackParamList, 'SetPicks'>;

type Picks = {
  label: string;
  icon?: string;
  isSelected: boolean;
};

interface Test extends PicksSelectProps {
  icon?: string;
}

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

  const [selectedPick, setPick] = useState('');

  const onSelection = (index: number, label: string) => {
    setPick(label);
    console.log(PICKS_DATA[index]);
    if (!PICKS_DATA[index].isSelected) {
      PICKS_DATA[index].isSelected = true;
    } else {
      PICKS_DATA[index].isSelected = false;
    }
  };

  const renderHeader = useCallback(() => {
    return (
      <>
        <Text variant="headlineSmall" style={styles.headerTextStyle}>
          Pick a minimum of 3 picks {selectedPick}
        </Text>
      </>
    );
  }, [selectedPick, styles]);

  const renderFooter = useCallback(() => {
    return (
      <>
        <Button mode="contained">Continue</Button>
      </>
    );
  }, []);

  const renderItem: ListRenderItem<Picks> = ({ item, index }) => (
    <PicksChip
      label={item.label}
      onSelection={onSelection}
      index={index}
      icon={item.icon}
      isSelected={item.isSelected}
    />
  );

  let tests: Array<Test> = [
    {
      label: 'hello',
      index: 0,
      isSelected: false,
      icon: '',
    },
  ];

  return (
    <View style={styles.chipContainer}>
      <FlatList
        data={PICKS_DATA}
        keyExtractor={item => item.label}
        renderItem={renderItem}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        extraData={PICKS_DATA}
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        ListFooterComponentStyle={styles.listFooterComponentStyle}
      />
      <PicksSelectView data={tests} />
    </View>
  );
};

export default withTheme(SetPicks);

const makeStyles = (theme: any) =>
  StyleSheet.create({
    chipContainer: {
      flex: 1,
      marginHorizontal: 20,
    },
    listContentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    listHeaderComponentStyle: {
      width: '100%',
      alignItems: 'flex-start',
      marginVertical: 25,
    },
    headerTextStyle: {},
    listFooterComponentStyle: {
      width: '100%',
      marginVertical: 25,
    },
  });
