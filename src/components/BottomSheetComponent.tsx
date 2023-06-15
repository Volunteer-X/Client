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

import { DefaultValue, ECharacter, characterSampleData } from '../constants';
import { shuffleArray } from '../utils';
import { useAppDispatch, useAppSelector } from '../hooks';
import { onSelection } from '../features/character/characterSlice';

type CharacterChipProps = {
  label: string;
  icon: string;
  isSelected: boolean | undefined;
  onSelect: Function;
};

const CharacterChip = ({
  label,
  icon,
  isSelected,
  onSelect,
}: CharacterChipProps) => {
  console.log(`rendering ${label}`);

  return (
    <>
      <Chip
        title={label}
        titleStyle={{ fontSize: 13 }}
        containerStyle={{ marginHorizontal: 2, marginTop: 5 }}
        type={isSelected ? 'solid' : 'outline'}
        icon={{
          name: icon,
          type: 'feather',
          size: 15,
        }}
        onPress={() => {
          onSelect(label);
        }}
      />
    </>
  );
};

const BottomSheetComponent = () => {
  // State to control the selected label locally
  const [selectedLabel, setSelectedLabel] = useState('');

  const characters = useAppSelector(state => state.character);
  const dispatch = useAppDispatch();

  //State to control the selected count
  const [selectedCount, setSelectedCount] = useState(
    characters.filter(item => item.isSelected).length,
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '70%'], []);

  // Backdrop Component
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop enableTouchThrough {...props} />
    ),
    [],
  );

  //Header
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

  // Footer
  const renderFooter = useCallback(() => {
    return (
      <>
        <Button
          title={`Pick up at least 8 interests (${selectedCount} / ${DefaultValue.min_num_of_character})`}
          style={styles.footerButton}
          radius="md"
          disabled={
            selectedCount < DefaultValue.min_num_of_character ? true : false
          }
        />
      </>
    );
  }, [selectedCount]);

  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // Selection handling
  const handleSelection = useCallback(
    (label: string) => {
      setSelectedLabel(label);
      dispatch(onSelection(label));
    },
    [dispatch],
  );

  useEffect(() => {
    setSelectedCount(characters.filter(item => item.isSelected).length);
    console.log(selectedCount);
  }, [selectedCount, characters]);

  return (
    <View style={styles.container}>
      <Button
        title={`Expand:: ${selectedCount}`}
        style={{ flex: 1 }}
        onPress={handleExpand}
      />
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
              <CharacterChip
                label={item.label}
                icon={item.icon}
                isSelected={
                  characters.find(character => character.label === item.label)
                    ?.isSelected
                }
                onSelect={handleSelection}
              />
            )}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={renderHeader}
            ListFooterComponentStyle={styles.listFooterComponentStyle}
            ListHeaderComponentStyle={styles.listHeaderComponentStyle}
            contentContainerStyle={styles.listContentContainer}
            columnWrapperStyle={styles.listColumnWrapperStyle}
            numColumns={3}
            extraData={selectedLabel}
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
  listFooterComponentStyle: { width: '90%', marginVertical: 50 },
  footerButton: { flex: 1 },
});
