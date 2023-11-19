import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { EPicksIcon } from '@app/lib';

import Animal from '@assets/icons/picks/animal.svg';
import Art from '@assets/icons/picks/art.svg';
import Children from '@assets/icons/picks/children.svg';
import Culture from '@assets/icons/picks/culture.svg';
import Civil from '@assets/icons/picks/civil.svg';
import Disaster from '@assets/icons/picks/disaster.svg';
import Economics from '@assets/icons/picks/economics.svg';
import Education from '@assets/icons/picks/education.svg';
import Environment from '@assets/icons/picks/environment.svg';
import Health from '@assets/icons/picks/health.svg';
import Human from '@assets/icons/picks/human.svg';
import Poverty from '@assets/icons/picks/poverty.svg';
import Politics from '@assets/icons/picks/politics.svg';
import Science from '@assets/icons/picks/science.svg';
import Social from '@assets/icons/picks/social.svg';
import Technology from '@assets/icons/picks/technology.svg';
import Women from '@assets/icons/picks/women.svg';

export const PicksIcon = ({
  icon,
  size = 32,
  containerStyle,
  iconStyle,
}: {
  icon: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
}) => {
  let IconLayer: React.ReactNode;
  switch (icon) {
    case EPicksIcon.Animal:
      IconLayer = (
        <Animal width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Art:
      IconLayer = (
        <Art width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Children:
      IconLayer = (
        <Children width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Culture:
      IconLayer = (
        <Culture width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Civil:
      IconLayer = (
        <Civil width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Disaster:
      IconLayer = (
        <Disaster width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Economic:
      IconLayer = (
        <Economics
          width={size}
          height={size}
          style={[styles.icon, iconStyle]}
        />
      );
      break;
    case EPicksIcon.Education:
      IconLayer = (
        <Education
          width={size}
          height={size}
          style={[styles.icon, iconStyle]}
        />
      );
      break;
    case EPicksIcon.Environment:
      IconLayer = (
        <Environment
          width={size}
          height={size}
          style={[styles.icon, iconStyle]}
        />
      );
      break;
    case EPicksIcon.Health:
      IconLayer = (
        <Health width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Human:
      IconLayer = (
        <Human width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Poverty:
      IconLayer = (
        <Poverty width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Politics:
      IconLayer = (
        <Politics width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Science:
      IconLayer = (
        <Science width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Social:
      IconLayer = (
        <Social width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    case EPicksIcon.Technology:
      IconLayer = (
        <Technology
          width={size}
          height={size}
          style={[styles.icon, iconStyle]}
        />
      );
      break;
    case EPicksIcon.Women:
      IconLayer = (
        <Women width={size} height={size} style={[styles.icon, iconStyle]} />
      );
      break;
    default:
      IconLayer = (
        <Animal width={size} height={size} style={[styles.icon, iconStyle]} />
      );
  }

  return (
    <View style={[styles.containerStyle, containerStyle]}>{IconLayer}</View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    padding: 5,
  },
  icon: {
    // color: 'green',
  },
});
