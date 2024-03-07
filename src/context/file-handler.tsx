import axios, { AxiosInstance } from 'axios';
import { createContext, useContext } from 'react';

import FileHandlerApi from '@app/services/fileHandler';
import React from 'react';
import { useAppSelector } from '@app/hooks';

type FilehandlerContextType = {
  client: AxiosInstance;
  authorize?: () => void;
};

const FileHandlerContext = createContext<FilehandlerContextType>({
  client: axios.create({}),
});

const FileHandlerClient = ({ children }: any) => {
  const { isAuthenticated, accessToken } = useAppSelector(
    state => state.root.auth,
  );

  const authorize = () => {
    if (!isAuthenticated) {
      console.log(
        '🚀 ~ file: file-handler.tsx:23 ~ authorize ~ isAuthenticated:',
        'User is not loggedIn',
      );

      // throw new Error('User is not logged in');
    }

    if (accessToken) {
      fileHandler.setToken(accessToken);
    }
  };

  const fileHandler = FileHandlerApi.getInstance();

  const client = fileHandler.client;

  const value: FilehandlerContextType = {
    client,
    authorize,
  };

  return (
    <FileHandlerContext.Provider value={value}>
      {children}
    </FileHandlerContext.Provider>
  );
};

const useFileHandlerClient = () => {
  const context = useContext(FileHandlerContext);
  if (context === undefined) {
    throw new Error(
      'useFileHandlerClient must be used within a FileHandlerClient',
    );
  }
  return context;
};

export { FileHandlerClient, useFileHandlerClient };
