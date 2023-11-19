import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { View, Text } from 'react-native';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyles } from './activity-setting.style';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetRefProps, settingProps } from './bottom-sheet.type';

export const ActivitySettingModal = forwardRef(
  ({}: settingProps, ref: Ref<BottomSheetRefProps>) => {
    const { theme } = useAppTheme();
    const styles = makeStyles(theme);

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const closeModal = () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.close();
      }
    };

    const openModal = () => {
      if (bottomSheetRef.current) {
        console.log('openModal');

        bottomSheetRef.current.present();
      }
    };

    useImperativeHandle(ref, () => ({
      openModal,
    }));

    const snapPoints = useMemo(() => ['50%'], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          enableTouchThrough
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <Text>Content</Text>
        </View>
      </BottomSheetModal>
    );
  },
);
