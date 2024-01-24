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
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  ActivityStackParamList,
  ActivityStackScreenProps,
} from '@ts-types/type';
import { useAppSelector } from '@app/hooks';
import DefualtErrorScreen from '@app/components/defualt-error';
import { findPickFromLabel } from '@app/utils/pick-finder';
import { MemberHorizontalView } from '../component/member-horizontal-view';
import { ActionsActivity } from '../component';
import { useJoin } from '../hooks';

type Props = {
  navigation: NavigationProp<ActivityStackParamList, 'ActivityScreen'>;
  route: RouteProp<ActivityStackParamList, 'ActivityScreen'>;
};

const ActivityScreen = ({ navigation, route }: Props) => {
  const inset = useSafeAreaInsets();
  const { theme } = useAppTheme();

  const styles = makeActivityStyles(theme, inset);

  const { activityID: id, activity, owner } = route.params;

  // States
  const [isOwner, setIsOwner] = React.useState(false);
  const [isMember, setIsMember] = React.useState(false);

  const { user: authUser } = useAppSelector(state => state.root.auth);
  const userId = authUser?.id as string;

  const { participants, join, isJoined, error } = useJoin(id as string, userId);

  // handle owner and member
  useEffect(() => {
    if (owner?.id === authUser?.id) {
      setIsOwner(true);
      setIsMember(true);
      return;
    }
    setIsMember(isJoined);
  }, [authUser?.id, isJoined, owner?.id]);

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

  const handleOnJoin = () => {
    console.log('Join Clicked');
    join(id as string, userId);
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
          contentContainerStyle={styles.flexGrow}>
          <View style={styles.flex}>
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
              <View style={styles.row}>
                <Text variant="bodySmall" style={styles.black}>
                  {'Created by '}
                  <Text style={styles.username}>{owner.username}</Text>
                  {Boolean(participants.totalCount) && (
                    <>
                      {'  |  '}
                      <Text
                        variant="bodySmall"
                        style={
                          styles.black
                        }>{`${participants.totalCount} Members`}</Text>
                    </>
                  )}
                </Text>
              </View>
              {/* Picks */}
              <PicksView
                picks={activity.picks}
                picksContainer={styles.picksContainer}
              />
            </View>
            {participants.members && participants.members.length > 0 && (
              <MemberHorizontalView members={participants.members} />
            )}

            {/* Body container */}
            <View style={styles.bodyContainer}>
              <ActionButtonGroupHorizontal
                isOwner={isOwner}
                isMember={isMember}
                actionButtonGroupContainer={styles.actionButtonGroupContainer}
                onJoin={handleOnJoin}
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

const PicksView = ({
  picks,
  picksContainer,
}: {
  picks: string[];
  picksContainer: {};
}) => {
  return (
    <View style={picksContainer}>
      {picks &&
        picks.map(pick => (
          <PicksIcon key={pick} icon={findPickFromLabel(pick).icon} size={20} />
        ))}
    </View>
  );
};

const ActionButtonGroupHorizontal = ({
  isOwner,
  isMember,
  actionButtonGroupContainer,
  onJoin,
  onForum,
}: {
  isOwner: boolean;
  isMember: boolean;
  actionButtonGroupContainer: {};
  onJoin?: () => void;
  onForum?: () => void;
}) => {
  return (
    <>
      {!isOwner && (
        <View style={actionButtonGroupContainer}>
          {!isMember && (
            <Button
              icon={AppIcons.PERSON_ADD}
              mode="contained"
              style={{ flex: 1 }}
              onPress={onJoin}>
              Join
            </Button>
          )}

          <Button
            icon={AppIcons.FORUM}
            mode="contained"
            style={{ flex: 1 }}
            onPress={onForum}>
            Forum
          </Button>
        </View>
      )}
    </>
  );
};
