import { Avatar } from '@app/components';
import { PADDING } from '@app/lib';
import { AppIcons } from '@app/theme/icon';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, MD3Colors, Text } from 'react-native-paper';

type Member = {
  id: string;
  username: string;
  firstName: string | undefined;
  picture: string | undefined;
};

export const MemberHorizontalView = ({ members }: { members: Member[] }) => {
  return (
    <View style={styles.container}>
      {members.map(member => (
        <MemberHorizontalItem member={member} key={member.id} />
      ))}
      {members.length > 3 && (
        <View style={styles.itemContainer}>
          <IconButton
            icon={`${AppIcons.MENU_X}-outline`}
            size={32}
            iconColor="#b2b2b2"
            style={styles.menuIcon}
          />
          {/* <Text variant="bodySmall">View all</Text> */}
        </View>
      )}
    </View>
  );
};

// !Gotta rewrite the appropiate values
const MemberHorizontalItem = ({ member }: { member: Member }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemSubContainer}>
        <Avatar
          size={45}
          name={member.firstName}
          uri={member.picture}
          showBorder
          borderColor="#FFF"
        />
      </View>
      {/* <Text
        variant="bodySmall"
        ellipsizeMode="tail"
        numberOfLines={1}
        style={{ color: MD3Colors.secondary0 }}>
        {`@${member.username}`}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: '#FFF',
    marginHorizontal: PADDING.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingBottom: PADDING.sm,
  },
  itemContainer: {
    alignItems: 'center',
    gap: 5,
    // backgroundColor: '#FFF',
  },
  itemSubContainer: {
    borderColor: '#FFF',
    borderWidth: 1.5,
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    backgroundColor: '#FFF',
    padding: 0,
    margin: 0,
  },
});
