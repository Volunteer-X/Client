import { AppIcons } from '@app/theme/icon';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

export const PingFab = () => {
  return (
    <>
      <AnimatedFAB
        icon={AppIcons.PING}
        label={'Ping'}
        extended
        visible
        animateFrom="right"
        iconMode="dynamic"
      />
    </>
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
