import { ImageBackground, StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import { Button, IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { ActivityCard, Avatar } from '@app/components';
import { PicksIcon } from '@app/components';
import {
  ActivitySettingModal,
  BottomSheetRefProps,
} from '@app/components/bottom-sheets';
import { AppIcons } from '@app/theme/icon';
import { ScrollView } from 'react-native-gesture-handler';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeActivityStyles } from './activity.style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityStackScreenProps } from '@ts-types/type';
import { useAppSelector } from '@app/hooks';
import DefualtErrorScreen from '@app/components/defualt-error';
import { findPickFromLabel } from '@app/utils/pick-finder';
import { MemberHorizontalView } from '../component/member-horizontal-view';
import { ActionsActivity } from '../component';

const ActivityScreen = () => {
  const inset = useSafeAreaInsets();
  const { theme } = useAppTheme();

  const styles = makeActivityStyles(theme, inset);

  // States
  const [isOwner, setIsOwner] = React.useState(false);
  const [isMember, setIsMember] = React.useState(false);

  const { user: authUser } = useAppSelector(state => state.root.auth);

  const navigation =
    useNavigation<ActivityStackScreenProps<'ActivityScreen'>['navigation']>();
  const route = useRoute<ActivityStackScreenProps<'ActivityScreen'>['route']>();
  // route params

  const { activityID: id, activity, owner } = route.params;

  // handle owner and member
  useEffect(() => {
    if (owner?.id === authUser?.id) {
      setIsOwner(true);
      setIsMember(true);
    }
  }, [authUser?.id, owner?.id]);

  // Refs
  const settingModalRef = React.useRef<BottomSheetRefProps>(null);

  // Bottom sheet Handlers
  // Activity Setting Modal
  const handleOnMenuClick = () => {
    console.log('Menu Clicked');

    if (settingModalRef.current) {
      settingModalRef.current.openModal();
    }
  };

  if (!activity || !owner) {
    return <DefualtErrorScreen screenName="Activity" />;
  }

  return (
    <View style={[styles.page]}>
      <StatusBar translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('@assets/images/gradient.png')}
        resizeMode="cover"
        style={styles.imageBackground}>
        {/* Actions */}
        <ActionsActivity isOwner isMember onPress={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          nestedScrollEnabled
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <ActivitySettingModal ref={settingModalRef} />

            {/* Avatar and Activity Title  */}
            <View style={styles.header}>
              <View style={[styles.avatarContainer]}>
                <View style={styles.avatarBorder}>
                  <Avatar
                    size={75}
                    name={owner.name?.firstName}
                    uri={owner.picture}
                    showBorder
                    borderColor="#000"
                  />
                </View>
              </View>
              <Text
                variant="bodyLarge"
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.activityTitle}>
                {activity.title}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text variant="bodySmall" style={{ color: '#000' }}>
                  {'Created by '}
                  <Text
                    style={{
                      fontWeight: '800',
                      color: '#000',
                    }}>
                    {owner.username}
                  </Text>
                  {'  |  '}
                  <Text
                    variant="bodySmall"
                    style={{ color: '#000' }}>{`5 Members`}</Text>
                </Text>
              </View>
              {/* Picks */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 2.5,
                  marginTop: 5,
                }}>
                {activity.picks &&
                  activity.picks.map(pick => (
                    <PicksIcon
                      key={pick}
                      icon={findPickFromLabel(pick).icon}
                      size={20}
                    />
                  ))}
              </View>
            </View>

            <MemberHorizontalView />

            {/* Body container */}
            <View style={styles.bodyContainer}>
              <ActionButtonGroupHorizontal
                isOwner={isOwner}
                isMember={isMember}
                actionButtonGroupContainer={styles.actionButtonGroupContainer}
              />
              {/* Activity Body */}
              <ActivityCard
                activity={activity}
                creator={owner}
                options={{
                  isOriginalPing: true,
                  isMember: isMember,
                  showStar: true,
                  textLines: 10,
                }}
                onMenuClick={handleOnMenuClick}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ActivityScreen;

const ActionButtonGroupHorizontal = ({
  isOwner,
  isMember,
  actionButtonGroupContainer,
}: {
  isOwner: boolean;
  isMember: boolean;
  actionButtonGroupContainer: {};
}) => {
  return (
    <>
      {!isOwner && (
        <View style={actionButtonGroupContainer}>
          {!isMember && (
            <Button
              icon={AppIcons.PERSON_ADD}
              mode="contained"
              style={{ flex: 1 }}>
              Join
            </Button>
          )}

          <Button icon={AppIcons.FORUM} mode="contained" style={{ flex: 1 }}>
            Forum
          </Button>
        </View>
      )}
    </>
  );
};
