import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {
  Avatar,
  Button,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { DIMENSIONS, PADDING } from '@app/lib';
import ActivityCard from '@app/components/activity-card';
import { is } from 'immer/dist/internal';

const ActivityScreen = () => {
  const inset = useSafeAreaInsets();

  const styles = makeStyles(inset);

  // States
  const [isOwner, setIsOwner] = React.useState(false);
  const [isMember, setIsMember] = React.useState(true);

  return (
    <View style={[styles.page]}>
      <StatusBar translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('@assets/images/activity-bg.png')}
        resizeMode="cover"
        style={styles.imageBackground}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            {/* Avatar and Activity Title  */}
            <View style={styles.header}>
              <View
                style={{
                  alignItems: 'center',
                  padding: 0,
                  margin: 15,
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  gap: 5,
                }}>
                {/* Show add only if you are member */}
                {!isOwner && !isMember && (
                  <Ionicon
                    name="person-add"
                    size={24}
                    style={{
                      color: '#FFF',
                      backgroundColor: '#000',
                      borderRadius: 50,
                      padding: 10,
                    }}
                  />
                )}
                {/* show  */}
                {isOwner && (
                  <Ionicon
                    name="cog"
                    size={24}
                    style={{
                      color: '#FFF',
                      backgroundColor: '#000',
                      borderRadius: 50,
                      padding: 10,
                    }}
                  />
                )}
                <Ionicon
                  name="chatbubble"
                  size={24}
                  style={{
                    color: '#FFF',
                    backgroundColor: '#000',
                    borderRadius: 50,
                    padding: 10,
                  }}
                />
              </View>
              <View style={[styles.avatarContainer]}>
                <View style={styles.avatarBorder}>
                  <Avatar.Image
                    source={require('@assets/images/placeholder.jpg')}
                    size={75}
                    style={styles.avatar}
                  />
                </View>
                <IconButton
                  icon={'pencil'}
                  size={16}
                  iconColor="#b2b2b2"
                  style={styles.editBadge}
                />
              </View>
              <Text variant="bodyLarge" style={styles.activityTitle}>
                Activity Name
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text variant="bodySmall" style={{ color: '#000' }}>
                  {'Created by '}
                  <Text
                    style={{
                      fontWeight: '800',
                      color: '#000',
                    }}>{`@username`}</Text>
                  {'  |  '}
                  <Text
                    variant="bodySmall"
                    style={{ color: '#000' }}>{`5 Members`}</Text>
                </Text>
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
                      <Avatar.Image
                        source={require('@assets/images/placeholder.jpg')}
                        size={45}
                        style={styles.avatar}
                      />
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
                  icon={'dots-horizontal'}
                  size={32}
                  iconColor="#b2b2b2"
                  style={{ backgroundColor: '#FFF', padding: 0, margin: 0 }}
                />
                <Text variant="bodySmall">View all</Text>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              {/* Update option, only for owner */}
              {isOwner && (
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
                  <Avatar.Image
                    source={require('@assets/images/placeholder.jpg')}
                    size={32}
                    style={styles.avatar}
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
              )}
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
                      icon={'account-plus'}
                      mode="contained"
                      style={{ flex: 1 }}>
                      Join
                    </Button>
                  )}

                  <Button icon={'chat'} mode="contained" style={{ flex: 1 }}>
                    Forum
                  </Button>
                </View>
              )}
              {/* Activity Body */}
              <ActivityCard />
              <ActivityCard />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ActivityScreen;

const makeStyles = (inset: EdgeInsets) =>
  StyleSheet.create({
    page: {
      // flex: 0,
      // backgroundColor: 'blue',
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      // flex: 1,
      zIndex: -100,
    },
    scrollView: {
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
      paddingRight: inset.right,
      paddingLeft: inset.left,
      // backgroundColor: 'red',
    },
    bodyContainer: {
      flex: 1,
      height: '100%',
      // !Change to match the overall theme
      backgroundColor: '#000',
      // height: DIMENSIONS.fullHeight - DIMENSIONS.fullHeight / 5,
      borderTopStartRadius: 25,
      borderTopEndRadius: 25,
      elevation: 2,
      padding: 15,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      // backgroundColor: 'red',
      paddingVertical: PADDING.md,
    },
    activityTitle: {
      fontWeight: 'bold',
      color: '#000',
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      margin: 0,
      backgroundColor: '#2a2a2a',
      borderWidth: 2,
      borderColor: 'transparent',
      zIndex: 100,
    },
    avatarContainer: {},
    avatarBorder: {
      borderColor: '#000',
      borderWidth: 2,
      height: 90,
      width: 90,
      borderRadius: 90 / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      padding: 0,
      margin: 0,
      elevation: 1,
    },
    memberContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      paddingBottom: PADDING.sm,
    },
  });
