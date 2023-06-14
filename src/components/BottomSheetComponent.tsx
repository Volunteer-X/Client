import React, { useRef, useMemo, useCallback, useState, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { Button, Chip, Divider, useTheme } from '@rneui/themed';

import { characterSampleData } from '../constants';
import { shuffleArray } from '../utils';

type CharacterChipProps = {
  label: string;
  icon: string;
  isSelected?: boolean;
  onSelection: Function;
};

const CharacterChip = ({
  label,
  icon,
  isSelected,
  onSelection,
}: CharacterChipProps) => {
  return (
    <>
      <Chip
        title={label}
        titleStyle={{ color: '#000', fontSize: 13 }}
        containerStyle={{ marginHorizontal: 2, marginTop: 5 }}
        type={isSelected ? 'solid' : 'outline'}
        icon={{
          name: icon,
          type: 'feather',
          size: 15,
        }}
        onPress={() => {
          onSelection(label);
        }}
      />
    </>
  );
};

const BottomSheetComponent = () => {
  const [isSelected, setIsSelected] = useState();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '75%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop enableTouchThrough {...props} />
    ),
    [],
  );

  const renderHeader = useCallback(() => {
    return (
      <>
        <Text style={styles.listHeaderTextStyle}>
          Pick some topics related to your mind
        </Text>
        <Divider style={{ width: '100%', marginTop: 10 }} />
      </>
    );
  }, []);

  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSelection = useCallback(props => {
    console.log(props);
  }, []);

  return (
    <View style={styles.container}>
      <Button title={'Expand'} style={{ flex: 1 }} onPress={handleExpand} />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}>
        <View style={styles.contentContainer}>
          <BottomSheetFlatList
            data={shuffleArray(characterSampleData)}
            renderItem={({ item }) => (
              <CharacterChip
                label={item.label}
                icon={item.icon}
                onSelection={handleSelection}
              />
            )}
            ListHeaderComponent={renderHeader}
            ListHeaderComponentStyle={styles.listHeaderComponentStyle}
            contentContainerStyle={styles.listContentContainer}
            columnWrapperStyle={styles.listColumnWrapperStyle}
            numColumns={3}
            keyExtractor={item => item.label}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  contentContainer: { flex: 1, alignItems: 'center' },
  listContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listColumnWrapperStyle: { flexWrap: 'nowrap' },
  listHeaderComponentStyle: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  listHeaderTextStyle: {
    color: '#000',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.1,
  },
});
