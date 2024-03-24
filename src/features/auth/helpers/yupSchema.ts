import { object, string } from 'yup';

import { Defaults } from '@app/lib/constants/values';

// (?!.*\.{2,})(?!\.)(?!.*\.$)[a-zA-Z0-9_\.]+
export const yupScheme = object({
  username: string()
    .trim()
    .min(
      Defaults.MIN_LEN_USERNAME,
      'Username should have a minimum of ${min} characters',
    )
    .max(
      Defaults.MAX_LEN_USERNAME,
      'Username should have a maximum of ${max} characters',
    )
    .matches(new RegExp('^(?!.*\\.{2,})(?!\\.)(?!.*\\.$)[a-zA-Z0-9_\\.]+$'), {
      excludeEmptyString: true,
      message: 'You can use letters, numbers, underscore & periods.',
    })
    .required('Username is required'),
  // .when('_', (_, schema) => {
  //   return schema.test(
  //     'checkAvailability',
  //     'This username already exists! 🥲',
  //     async value => {
  //       const isAvailable = await debouncedCheckAvailability(value);

  //       console.log(
  //         '🚀 ~ file: yupSchema.ts:36 ~ yupScheme ~ isAvailable:',
  //         isAvailable,
  //       );

  //       return isAvailable as boolean;
  //     },
  //   );
  // }),
}).required();
