import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

export const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: async (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: async key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: async key => {
    storage.delete(key);
    return Promise.resolve();
  },
};
