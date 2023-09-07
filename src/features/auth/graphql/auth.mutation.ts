import { gql, TypedDocumentNode } from '@apollo/client';

type createUserData = {
  user: {
    id: string;
    email: string;
    username: string;
    name: {
      firstName: string;
      lastName: string;
    };
    picture: string;
    role: string;
    picks: Array<string>;
  };
};

type createUserVars = {
  createUserInput: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    role: string;
    picture?: string;
    picks: Array<string>;
  };
};

// * Possible area to add fragment for better reusability
const CREATE_USER: TypedDocumentNode<createUserData, createUserVars> = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      username
      name {
        firstName
        lastName
      }
      picks
      picture
      role
    }
  }
`;

export { CREATE_USER };
