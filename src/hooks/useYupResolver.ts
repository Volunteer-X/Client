import { useCallback } from 'react';
import { FieldValues, Resolver } from 'react-hook-form';
import { AnyObject, ObjectSchema } from 'yup';

const useYupResolver = <T extends FieldValues>(
  validationSchema: ObjectSchema<AnyObject>,
): Resolver<T, any> =>
  useCallback(
    async (data: T) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });
        return { values, errors: {} };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );

export default useYupResolver;
