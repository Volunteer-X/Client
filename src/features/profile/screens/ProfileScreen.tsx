import React from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Avatar, Button, Icon } from '@rneui/themed';
import { Text } from 'react-native-paper';

import { PageNames } from '../../../lib';
import UserFeeds from './UserFeeds';
import ActivityScreen from '../../activity/screens/ActivityScreen';

const StatView = ({
  statCount,
  statLabel,
}: {
  statCount: number;
  statLabel: string;
}): React.JSX.Element => {
  return (
    <Pressable onPress={() => {}} style={styles.statsContentContainer}>
      <Text variant="labelSmall" style={styles.statsCount}>
        {statCount}
      </Text>
      <Text variant="labelSmall">{statLabel}</Text>
    </Pressable>
  );
};

const TabIcon = (
  {
    color,
    focused,
  }: {
    color: string;
    focused: boolean;
  },
  routeName: string,
): React.JSX.Element => {
  let iconName: string, iconType: string;
  switch (routeName) {
    case PageNames.UserFeeds:
      iconName = 'home';
      iconType = 'feather';
      break;
    case PageNames.Activity:
      iconName = 'activity';
      iconType = 'feather';
      break;
    default:
      iconName = '';
      iconType = '';
      break;
  }
  return <Icon name={iconName} type={iconType} color={color} />;
};

const ProfileScreen = () => {
  let isOwner: boolean = true; //state which controlls if the user viewing is the owner or not

  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeaderContainer}>
        {/* If the account is accessed by the account-owner */}
        {isOwner ? (
          <Button
            icon={{
              name: 'square-edit-outline',
              type: 'material-community',
              size: 24,
              color: '#FFF',
            }}
            radius="md"
            containerStyle={{
              position: 'absolute',
              right: 0,
              top: 0,
              padding: 10,
            }}
            type="clear"
          />
        ) : (
          ''
        )}
        <Avatar
          rounded
          size={'large'}
          source={require('@assets/images/placeholder.jpg')}
        />
        <Text variant="titleLarge">Amil Muhammed Hamza</Text>
        <Text variant="bodySmall">@docren155</Text>
        <View style={styles.statsContainer}>
          <StatView statCount={234} statLabel="Followers" />
          <StatView statCount={123} statLabel="Following" />
          <StatView statCount={2} statLabel="Activities" />
        </View>
        <View style={styles.headerActionContainer}>
          <Button
            title={'Follow'}
            icon={{
              name: 'user-plus',
              type: 'feather',
              size: 15,
              color: 'white',
            }}
            radius="md"
            iconContainerStyle={actionStyle.iconContainerStyle}
            titleStyle={actionStyle.titleStyle}
            buttonStyle={actionStyle.buttonStyle}
            containerStyle={actionStyle.containerStyle}
          />

          <Button
            title={'Characters'}
            icon={{
              name: 'infinite',
              type: 'ionicon',
              size: 15,
              color: '#FFF',
            }}
            radius="md"
            iconContainerStyle={actionStyle.iconContainerStyle}
            titleStyle={actionStyle.titleStyle}
            buttonStyle={actionStyle.buttonStyle}
            containerStyle={actionStyle.containerStyle}
            type="outline"
          />
        </View>
      </View>
      {/* Profile tabs */}
      <Tab.Navigator
        initialRouteName={PageNames.Activity}
        initialLayout={{ width: Dimensions.get('window').width }}
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarShowIcon: true,
          tabBarIcon: props => TabIcon(props, route.name),
        })}>
        <Tab.Screen name={PageNames.Activity} component={ActivityScreen} />
        <Tab.Screen name={PageNames.UserFeeds} component={UserFeeds} />
      </Tab.Navigator>
    </View>
  );
};

export default ProfileScreen;

const actionStyle = StyleSheet.create({
  iconContainerStyle: {
    marginRight: 10,
  },
  titleStyle: { fontWeight: '700' },
  buttonStyle: { borderWidth: 1 },
  containerStyle: { flex: 0.4 },
});

const styles = StyleSheet.create({
  container: { backgroundColor: '#012', flex: 1 },
  profileHeaderContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  statsContentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  username: {},
  statsCount: { fontWeight: 'bold' },
  statsLabel: { fontSize: 11 },
  headerActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
});
