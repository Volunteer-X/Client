import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { PADDING, Picks } from '@app/lib';
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
  const id = route.params?.activityID;
  const activity = route.params?.activity;
  const owner = route.params?.owner;

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
    return <DefualtErrorScreen />;
  }

  return (
    <View style={[styles.page]}>
      <StatusBar translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('@assets/images/gradient.png')}
        resizeMode="cover"
        style={styles.imageBackground}>
        {/* Actions */}
        <View style={styles.headerFloat}>
          <Ionicon
            name={AppIcons.ARROW_BACK}
            size={24}
            style={[styles.actions]}
            onPress={() => navigation.goBack()}
          />
          {/* Show add only if you are not a member or not the owner */}
          <View style={{ flexDirection: 'column', gap: 10 }}>
            {!isOwner && !isMember && (
              <Ionicon
                name={AppIcons.PERSON_ADD}
                size={24}
                style={styles.actions}
              />
            )}
            {/* show setting, only if owner  */}
            {isOwner && (
              <Ionicon
                name={AppIcons.SETTINGS}
                size={24}
                style={styles.actions}
              />
            )}
            <Ionicon name={AppIcons.FORUM} size={24} style={styles.actions} />
          </View>
        </View>
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
                  <Avatar size={75} showBorder borderColor="#000" />
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
            {/* Member container */}
            <View style={styles.memberContainer}>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <View
                    style={{
                      alignItems: 'center',
                      gap: 5,
                    }}
                    key={i}>
                    <View
                      style={{
                        borderColor: '#FFF',
                        borderWidth: 1.5,
                        height: 55,
                        width: 55,
                        borderRadius: 55 / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Avatar size={45} showBorder borderColor="#FFF" />
                    </View>
                    <Text variant="bodySmall">Members</Text>
                  </View>
                ))}
              <View
                style={{
                  alignItems: 'center',
                  gap: 5,
                }}>
                <IconButton
                  icon={`${AppIcons.MENU_X}-outline`}
                  size={32}
                  iconColor="#b2b2b2"
                  style={{ backgroundColor: '#FFF', padding: 0, margin: 0 }}
                />
                <Text variant="bodySmall">View all</Text>
              </View>
            </View>
            {/* Body container */}
            <View style={styles.bodyContainer}>
              {/* Update option, only for owner */}
              {/* {isOwner && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: '#16161d',
                    padding: 10,
                    marginBottom: 10,
                    gap: 10,
                  }}>
                  <Avatar
                    uri={owner?.picture}
                    size={32}
                    // style={styles.avatar}
                  />
                  <TextInput
                    mode="flat"
                    placeholder="Update on the activity..."
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                    }}
                    cursorColor={'#000'}
                  />
                  <Button>Post</Button>
                </View>
              )} */}
              {!isOwner && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    padding: 10,
                    marginBottom: 10,
                    gap: 10,
                  }}>
                  {!isMember && (
                    <Button
                      icon={AppIcons.PERSON_ADD}
                      mode="contained"
                      style={{ flex: 1 }}>
                      Join
                    </Button>
                  )}

                  <Button
                    icon={AppIcons.FORUM}
                    mode="contained"
                    style={{ flex: 1 }}>
                    Forum
                  </Button>
                </View>
              )}
              {/* Activity Body */}
              <ActivityCard
                activity={activity}
                creator={owner}
                options={{
                  isOriginalPing: true,
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
