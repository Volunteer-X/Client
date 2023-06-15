import React from 'react';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

const BackButton = props => {
  const navigation = useNavigation();
  return <HeaderBackButton onPress={() => navigation.goBack()} />;
};

export default BackButton;
