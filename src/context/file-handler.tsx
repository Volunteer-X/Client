import { useAppSelector } from '@app/hooks';
import FileHandlerApi from '@app/services/fileHandler';
import axios, { AxiosInstance } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { useAuth0 } from 'react-native-auth0';

const FileHandlerContext = createContext<AxiosInstance>(axios.create({}));

const FileHandlerClient = ({ children }: any) => {
  // const { getCredentials, hasValidCredentials } = useAuth0();

  const { isAuthenticated, accessToken } = useAppSelector(
    state => state.root.auth,
  );

  // const [token, setToken] = useState<string>();

  // const auth = useCallback(async () => {
  //   try {
  //     const loggedIn = await hasValidCredentials();
  //     if (!loggedIn) {
  //       throw new Error('User is not logged in');
  //     }
  //     const credentials = await getCredentials();
  //     let accessToken = credentials?.accessToken;

  //     if (!accessToken) {
  //       throw new Error('Access token is missing');
  //     }

  //     setToken(accessToken);
  //   } catch (error) {
  //     throw new Error(`${error}`);
  //   }
  // }, [getCredentials, hasValidCredentials]);

  // useEffect(() => {
  //   auth()
  //     //   .then(val => {
  //     //     if (val) {
  //     //       setToken(val);
  //     //     }
  //     //   })
  //     .catch(e => console.log(e));

  //   return () => {
  //     setToken('');
  //   };
  // }, [auth]);

  if (!isAuthenticated) {
    throw new Error('User is not logged in');
  }

  const fileHandler = FileHandlerApi.getInstance();

  const client = fileHandler.client;

  if (accessToken) {
    fileHandler.setToken(accessToken);
  }

  return (
    <FileHandlerContext.Provider value={client}>
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
