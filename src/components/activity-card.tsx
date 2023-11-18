import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Avatar, IconButton, Text } from 'react-native-paper';
import { PADDING } from '@app/lib';
import Icon from 'react-native-vector-icons/Ionicons';

const ActivityCard = () => {
  return (
    <View
      style={{
        // paddingVertical: PADDING.sm,
        gap: 15,
        flexDirection: 'row',
        // marginVertical: PADDING.sm,
        // backgroundColor: 'red',
        // borderRadius: 10,
      }}>
      {/* Left side */}
      <View
        style={{
          // height: '100%',
          flex: 0,
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
            flex: 1,
            width: 1,
            height: '100%',
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
          {/* URL */}
          {/* Media */}
          {/* Actions */}
          <View style={{ flexDirection: 'row', display: 'flex' }}>
            <Icon
              name="heart-outline"
              size={24}
              color="#FFF"
              style={{
                padding: 0,
                marginVertical: 5,
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
