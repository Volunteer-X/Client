import {
  PermissionStatuses,
  PERMISSIONS_STATUSES,
  PERMISSION_LIST,
} from '@app/utils/permissions';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  checkMultiple,
  Permission,
  requestMultiple,
} from 'react-native-permissions';

const PermissionContext =
  createContext<PermissionStatuses>(PERMISSIONS_STATUSES);

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] =
    useState<PermissionStatuses>(PERMISSIONS_STATUSES);

  const checkPermissions = useCallback(async () => {
    checkMultiple(PERMISSION_LIST).then(statuses => {
      if (
        Object.keys(statuses).every(
          (key: string) => statuses[key as Permission] !== 'granted',
        )
      ) {
        requestPermissions();
      } else {
        setPermissions(statuses);
      }
    });
  }, []);

  const requestPermissions = async () => {
    requestMultiple(PERMISSION_LIST).then(statuses => {
      if (
        Object.keys(statuses).every(
          (key: string) => statuses[key as Permission] !== 'granted',
        )
      ) {
      } else {
        setPermissions(statuses);
      }
    });
  };

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  return (
    <PermissionContext.Provider value={permissions}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);

  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }

  return context;
};
