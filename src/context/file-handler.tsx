import { useAppSelector } from '@app/hooks';
import FileHandlerApi from '@app/services/fileHandler';
import axios, { AxiosInstance } from 'axios';
import React from 'react';
import { createContext, useContext } from 'react';

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
      console.log('User is not loggedIn');
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
