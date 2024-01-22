import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, IconButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { PageNames } from '../../../lib';
import UserFeeds from './UserFeeds';
import { useAppSelector } from '@app/hooks';
import { Avatar } from '@app/components';
import { AppIcons } from '@app/theme/icon';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainDrawerParamList } from '@app/types/type';

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
  let iconName: string;
  switch (routeName) {
    case PageNames.UserFeeds:
      iconName = 'pulse';
      break;
    case 'ActivityTab':
      iconName = 'activity';
      break;
    default:
      iconName = '';
      break;
  }
  return <Icon name={iconName} size={20} color={color} />;
};

type Props = {
  route: RouteProp<MainDrawerParamList, 'Profile'>;
};

const ProfileScreen = ({ route }: Props) => {
  const [isOwner, setIsOwner] = useState<boolean>(false); //state which controlls if the user viewing is the owner or not

  // If the userID is same as the logged in user's ID, then the user is the owner
  const { user } = useAppSelector(state => state.root.auth);

  const userID = route.params?.userID;

  useEffect(() => {
    if (user?.id === userID) {
      setIsOwner(true);
    }
  }, [user?.id, userID]);

  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeaderContainer}>
        {/* If the account is accessed by the account-owner */}
        {isOwner && (
          // Edit Profile Button
          <IconButton icon={AppIcons.EDIT} size={128} />
        )}
        <Avatar size={108} uri={user?.picture} />
        <Text variant="titleLarge">{`${user?.firstName} ${user?.lastName}`}</Text>
        <Text variant="bodySmall">{`@${user?.username}`}</Text>
        <View style={styles.statsContainer}>
          {/* <StatView statCount={234} statLabel="Followers" />
          <StatView statCount={123} statLabel="Following" /> */}
          <StatView statCount={2} statLabel="Activities" />
        </View>
        <View style={styles.headerActionContainer}>
          <Button>Follow</Button>

          <Button mode="outlined">Picks</Button>
        </View>
      </View>
      {/* Profile tabs */}
      <Tab.Navigator
        // initialRouteName={'ActivityTab'}
        initialLayout={{ width: Dimensions.get('window').width }}
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarShowIcon: true,
          tabBarIcon: props => TabIcon(props, route.name),
        })}>
        {/* <Tab.Screen name="ActivityTab" component={ActivityScreen} /> */}
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
