import { Avatar } from '@app/components';
import { PADDING } from '@app/lib';
import { AppIcons } from '@app/theme/icon';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export const MemberHorizontalView = () => {
  return (
    <View style={styles.container}>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <MemberHorizontalItem item={i} key={i} />
        ))}
      <View style={styles.itemContainer}>
        <IconButton
          icon={`${AppIcons.MENU_X}-outline`}
          size={32}
          iconColor="#b2b2b2"
          style={styles.menuIcon}
        />
        <Text variant="bodySmall">View all</Text>
      </View>
    </View>
  );
};

// !Gotta rewrite the appropiate values
const MemberHorizontalItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemSubContainer}>
        <Avatar size={45} showBorder borderColor="#FFF" />
      </View>
      <Text variant="bodySmall">Members</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingBottom: PADDING.sm,
  },
  itemContainer: {
    alignItems: 'center',
    gap: 5,
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
