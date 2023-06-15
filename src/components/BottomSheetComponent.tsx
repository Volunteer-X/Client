import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  memo,
  useEffect,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { Button, Chip, Divider } from '@rneui/themed';

import { ECharacter, characterSampleData } from '../constants';
import { shuffleArray } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks';
import { onSelection } from '../features/character/characterSlice';

type CharacterChipProps = {
  label: string;
  icon: string;
};

const CharacterChip = ({ label, icon }: CharacterChipProps) => {
  const isSelected: boolean | undefined = useAppSelector(
    state =>
      state.character.find(character => label === character.label)?.isSelected,
  );
  const dispatch = useAppDispatch();

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
          console.log(isSelected);
          dispatch(onSelection(label));
        }}
      />
    </>
  );
};

const BottomSheetComponent = () => {
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

  // useEffect(() => {
  //   characters = shuffleArray(characters);
  // }, []);

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
            data={characterSampleData}
            renderItem={({ item }) => (
              <CharacterChip label={item.label} icon={item.icon} />
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
