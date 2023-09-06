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
}).required();
