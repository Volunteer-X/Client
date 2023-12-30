import useAppTheme from '@app/hooks/useAppTheme';
import { Activity } from '@app/types/entities';
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
import { ActivityCard } from '..';
import { makeStyles } from './activity-setting.style';
import { ActivityBottomSheetRef } from './bottomsheet.type';

export const ActivityBottomSheet = forwardRef(
  (props: any, ref: Ref<ActivityBottomSheetRef>) => {
    const { theme } = useAppTheme();
    const styles = makeStyles(theme);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [activity, setActivity] = React.useState<Activity>();

    useImperativeHandle(ref, () => ({
      openModal: () => {
        bottomSheetRef.current?.present();
      },
      setActivity(_activity) {
        console.log('activity', activity);
        setActivity(_activity);
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
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        style={styles.bottomSheetModal}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        animationDuration={300}
        {...props}>
        <View style={styles.contentContainer}>
          {activity && (
            <ActivityCard
              activity={activity}
              creator={activity.creator}
              isMember={false}
              showPicks={false}
              showStar={false}
              textLines={10}
              onMenuClick={() => {}}
              onPress={() => {}}
            />
          )}
        </View>
      </BottomSheetModal>
    );
  },
);
