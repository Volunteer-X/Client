import * as Keychain from 'react-native-keychain';

type SetSecureValue = (
  key: string,
  value: string,
) => Promise<false | Keychain.Result>;
type GetSecureValue = (key: string) => Promise<string | false>;
type RemoveSecureValue = (key: string) => Promise<void>;

export const setSecureValue: SetSecureValue = (key, value) =>
  Keychain.setInternetCredentials(key, key, value);

export const getSecureValue: GetSecureValue = async key => {
  const credentials = await Keychain.getInternetCredentials(key);
  if (credentials) {
    return credentials.password;
  }
  return false;
};

export const removeSecureValue: RemoveSecureValue = async key =>
  Keychain.resetInternetCredentials(key);
