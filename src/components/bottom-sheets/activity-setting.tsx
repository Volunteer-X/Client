import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { View, Pressable } from 'react-native';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyles } from './activity-setting.style';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetRefProps, settingProps } from './bottom-sheet.type';
import { Text } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SIZES } from '@app/lib';
import { AppIcons } from '@app/theme/icon';

enum ActivitySettingLabel {
  Delete = 'Delete',
  Report = 'Report',
  Profile = 'About the creator',
  Edit = 'Edit',
}

const ActivitySettingList = [
  {
    label: ActivitySettingLabel.Edit,
    icon: `${AppIcons.EDIT}-outline`,
    forOwner: true,
    danger: false,
  },
  {
    label: ActivitySettingLabel.Profile,
    icon: AppIcons.PERSON,
    forOwner: false,
    danger: false,
  },
  {
    label: ActivitySettingLabel.Delete,
    icon: AppIcons.DELETE,
    forOwner: true,
    danger: true,
  },
  {
    label: ActivitySettingLabel.Report,
    icon: AppIcons.REPORT,
    forOwner: false,
    danger: true,
  },
];

export const ActivitySettingModal = forwardRef(
  ({ isOwner = true }: settingProps, ref: Ref<BottomSheetRefProps>) => {
    const { theme } = useAppTheme();
    const styles = makeStyles(theme);

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      openModal: () => {
        if (bottomSheetRef.current) {
          console.log('openModal');

          bottomSheetRef.current.present();
        }
      },
    }));

    const snapPoints = useMemo(() => ['20%'], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.85}
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
        enableOverDrag={false}
        style={styles.bottomSheetModal}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          {ActivitySettingList.filter(val => {
            if (isOwner) {
              return val.forOwner === true;
            }
            return val.forOwner === false;
          }).map((setting, index) => (
            <Pressable key={index} style={styles.subContainer}>
              <Ionicon
                name={setting.icon}
                size={SIZES.large}
                color={setting.danger ? '#bf3939' : '#e3e1e1'}
              />
              <Text variant="labelLarge" style={styles.label}>
                {setting.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetModal>
    );
  },
);
