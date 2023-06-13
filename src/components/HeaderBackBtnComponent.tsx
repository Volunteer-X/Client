import React from 'react';
import { HeaderBackButton } from '@react-navigation/elements';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const HeaderBackBtnComponent = props => {
  const navigation = useNavigation();
  return <HeaderBackButton onPress={() => navigation.goBack()} />;
};

export default HeaderBackBtnComponent;
