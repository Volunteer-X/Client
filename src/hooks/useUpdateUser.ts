import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@app/graphql/common.mutation';

type UpdateUserInput = {
  id: string;
  email?: string;
  username?: string;
  name?: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
  };
  picture?: string;
  picks?: string[];
  devices?: string[];
};

export const useUpdateUser = () => {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

  const execute = async (payload: UpdateUserInput) => {
    const result = await updateUser({
      variables: {
        payload,
      },
    });

    console.log('result', result);
  };

  return { execute, loading, error };
};
