import { AppIcons } from '@app/theme/icon';
import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

export const ActivityListFab = () => {
  const [fabState, setFabState] = useState({ open: false });

  const onStateChange = ({ open }) => setFabState({ open });

  const { open } = fabState;

  return (
    <Portal>
      <FAB.Group
        style={{}}
        open={open}
        visible
        icon={open ? AppIcons.CLOSE : AppIcons.FILTER}
        actions={[
          {
            icon: AppIcons.HOT,
            label: 'Hot',
            onPress: () => console.log('Pressed add'),
          },
          { icon: AppIcons.TIME, label: 'Latest', onPress: () => {} },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};
