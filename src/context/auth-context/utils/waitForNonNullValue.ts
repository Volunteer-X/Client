import { User } from 'react-native-auth0';

export function waitForNonNullValue(value: User | null): Promise<User> {
  return new Promise(resolve => {
    function checkValue() {
      if (value !== null && value !== undefined) {
        console.log('value is not null', value);

        resolve(value);
      } else {
        setTimeout(checkValue, 10); // Adjust the delay as needed
      }
    }

    checkValue();
  });
}
