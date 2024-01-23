import { AppIcons } from '@app/theme/icon';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';

export const ActionsActivity = ({
  isOwner,
  isMember,
  onPress,
}: {
  isOwner: boolean;
  isMember: boolean;
  onPress: () => void;
}) => {
  const inset = useSafeAreaInsets();

  const styles = makeStyles(inset);

  return (
    <View style={styles.container}>
      <Ionicon
        name={AppIcons.ARROW_BACK}
        size={24}
        style={[styles.actions]}
        onPress={onPress}
      />
      {/* Show add only if you are not a member or not the owner */}
      <View style={styles.subContainer}>
        {!isOwner && !isMember && (
          <Ionicon
            name={AppIcons.PERSON_ADD}
            size={24}
            style={styles.actions}
          />
        )}
        {/* show setting, only if owner  */}
        {isOwner && (
          <Ionicon name={AppIcons.SETTINGS} size={24} style={styles.actions} />
        )}
        <Ionicon name={AppIcons.FORUM} size={24} style={styles.actions} />
      </View>
    </View>
  );
};

const makeStyles = (inset: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 15,
      marginTop: inset.top,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      gap: 5,
      width: '100%',
      zIndex: 100,
      // backgroundColor: 'red',
    },
    subContainer: {
      flexDirection: 'column',
      gap: 10,
    },
    actions: {
      color: '#FFF',
      backgroundColor: '#000',
      borderRadius: 50,
      padding: 10,
    },
  });
