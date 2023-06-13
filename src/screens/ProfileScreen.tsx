import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Avatar, Button } from '@rneui/themed';

const StatView = ({
  statCount,
  statLabel,
}: {
  statCount: number;
  statLabel: string;
}): React.JSX.Element => {
  return (
    <Pressable onPress={() => {}} style={styles.statsContentContainer}>
      <Text style={styles.statsCount}>{statCount}</Text>
      <Text style={styles.statsLabel}>{statLabel}</Text>
    </Pressable>
  );
};

const ProfileScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeaderContainer}>
        <Avatar
          rounded
          size={'large'}
          source={require('../assets/placeholder.jpg')}
        />
        <Text>Full Name</Text>
        <Text style={styles.username}>@username</Text>
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
          {/* If the account is accessed by the account-owner */}
          <Button
            title={'Profile'}
            icon={{
              name: 'edit',
              type: 'feather',
              size: 15,
              color: '#5b5b5b',
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
  container: { backgroundColor: '#012' },
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
  username: { fontSize: 11 },
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
