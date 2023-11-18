import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Avatar, IconButton, Text } from 'react-native-paper';
import { PADDING } from '@app/lib';

const ActivityCard = () => {
  return (
    <View
      style={{
        paddingVertical: PADDING.md,
        gap: 15,
        flexDirection: 'row',
        height: 'auto',

        backgroundColor: 'red',
      }}>
      {/* Left side */}
      <View
        style={{
          height: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          columnGap: 10,
        }}>
        <Avatar.Image
          source={require('@assets/images/placeholder.jpg')}
          size={32}
          style={styles.avatar}
        />
        <View
          style={{
            width: 1,
            height: 'auto',
            backgroundColor: '#c5c5c5',
            marginVertical: PADDING.sm,
          }}
        />
      </View>
      {/* Right side */}
      <View style={{ flex: 1 }}>
        {/* Username, timeline, options */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
            username
          </Text>
          <Text variant="bodyMedium" style={{ marginEnd: 30 }}>
            2h
          </Text>
          <IconButton
            icon={'dots-horizontal'}
            size={24}
            iconColor="#FFF"
            containerColor="transparent"
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              padding: 0,
              margin: 0,
            }}
          />
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            voluptatum? Quo, quia. Quisquam, voluptatum voluptates? Quisquam,
            voluptatum voluptates?
          </Text>
          {/* Actions */}
          <View style={{ flexDirection: 'row', display: 'none' }}>
            <IconButton
              icon={'heart'}
              size={24}
              iconColor="#FFF"
              containerColor="transparent"
              style={{
                padding: 0,
                margin: 0,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  avatar: {
    padding: 0,
    margin: 0,
    elevation: 1,
  },
});
