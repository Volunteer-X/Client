import useAppTheme from '@app/hooks/useAppTheme';
import { Activity, User } from '@app/types/entities';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import ActivityCard from '@components/activity-card';
import { makeStyles } from './activity-setting.style';
import { ActivityBottomSheetRef } from './bottomsheet.type';

export const ActivityBottomSheet = forwardRef(
  ({ onPress }: { onPress: () => void }, ref: Ref<ActivityBottomSheetRef>) => {
    const { theme } = useAppTheme();
    const styles = makeStyles(theme);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [activity, setActivity] = React.useState<Activity>();
    const [creator, setCreator] = React.useState<User>();

    useImperativeHandle(ref, () => ({
      openModal: (_activity, _creator) => {
        setActivity(_activity);
        setCreator(_creator);
        bottomSheetRef.current?.present();
      },
      data: { activity: activity ? activity : ({} as Activity), creator },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }));

    const snapPoints = useMemo(() => ['50%', '75%'], []);

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          opacity={0.85}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          enableTouchThrough
        />
      ),
      [],
    );

    if (!activity || !creator) {
      return null;
    }

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={styles.bottomSheetModal}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}>
        <View style={styles.contentContainer}>
          <ActivityCard
            activity={activity}
            creator={creator}
            options={{
              isMember: false,
              showMenu: false,
              textLines: 10,
              showPicks: true,
            }}
            onMenuClick={() => {}}
            onPress={onPress}
          />
        </View>
      </BottomSheetModal>
    );
  },
);
