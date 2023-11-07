import React from 'react';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { StyleProp, View, ViewStyle } from 'react-native';

const BackButton = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const navigation = useNavigation();
  return (
    <View style={style}>
      <HeaderBackButton onPress={() => navigation.goBack()} />
    </View>
  );
};

export default BackButton;
