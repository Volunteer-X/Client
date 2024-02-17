import { IconProps } from 'react-native-vector-icons/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CustomIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Ionicons> &
    Readonly<IconProps>,
) => {
  return <Ionicons {...props} />;
};
