import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';
import { DIMENSIONS, PADDING } from '@app/lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ActivityCard from '@app/components/activity-card';

const ActivityScreen = () => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.page]}>
      <StatusBar translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('@assets/images/activity-bg.png')}
        resizeMode="cover"
        style={styles.imageBackground}>
        <View
          style={{
            paddingTop: inset.top,
            paddingBottom: inset.bottom,
            paddingRight: inset.right,
            paddingLeft: inset.left,
          }}>
          {/* Avatar and Activity Title  */}
          <View style={styles.header}>
            <View
              style={{
                alignItems: 'center',
                padding: 0,
                margin: 15,
                position: 'absolute',
                top: 0,
                right: 0,
              }}>
              <IconButton
                icon={'account-plus'}
                size={30}
                iconColor="#FFF"
                containerColor="#000"
                style={{ padding: 5 }}
              />
              <IconButton
                icon={'chat'}
                size={30}
                iconColor="#FFF"
                containerColor="#000"
                style={{
                  padding: 5,
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: '#16161d',
                padding: 10,
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
                style={{ flex: 1, backgroundColor: 'transparent' }}
                cursorColor={'#000'}
              />
              <Button>Post</Button>
            </View>
            {/* Activity Body */}
            <ActivityCard />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    zIndex: -100,
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
  bodyContainer: {
    height: '100%',
    // !Change to match the overall theme
    backgroundColor: '#000',
    // height: DIMENSIONS.fullHeight - DIMENSIONS.fullHeight / 5,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    elevation: 2,
    padding: 15,
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    // backgroundColor: 'red',
    paddingBottom: PADDING.sm,
  },
});
