/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date | string; output: Date | string };
  EmailAddress: { input: string; output: string };
  Latitude: { input: string | number; output: string | number };
  Longitude: { input: string | number; output: string | number };
  ObjectID: { input: string; output: string };
  URL: { input: URL | string; output: URL | string };
};

export type CreatePingInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Latitude']['input'];
  longitude: Scalars['Longitude']['input'];
  picks: Array<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['URL']['input']>;
  userID: Scalars['ID']['input'];
};

export type CreateUserInput = {
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  picks: Array<InputMaybe<Scalars['String']['input']>>;
  picture?: InputMaybe<Scalars['String']['input']>;
  role: Role;
  username: Scalars['String']['input'];
};

export type Media = {
  __typename?: 'Media';
  key: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type MediaInput = {
  key: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPing: Scalars['ID']['output'];
  createUser: User;
  removeUser?: Maybe<User>;
  updatePing: Scalars['ID']['output'];
  updateUser: User;
};

export type MutationCreatePingArgs = {
  createPingInput: CreatePingInput;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type MutationRemoveUserArgs = {
  id: Scalars['ObjectID']['input'];
};

export type MutationUpdatePingArgs = {
  updatePingInput: UpdatePingInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Name = {
  __typename?: 'Name';
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
};

export type Ping = {
  __typename?: 'Ping';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude: Scalars['Latitude']['output'];
  longitude: Scalars['Longitude']['output'];
  media?: Maybe<Array<Maybe<Media>>>;
  picks: Array<Scalars['String']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['URL']['output']>;
  userID: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  getUserByEmail?: Maybe<User>;
  getUserByID?: Maybe<User>;
  isUsernameAvailable: Scalars['Boolean']['output'];
  users: Array<Maybe<User>>;
};

export type QueryGetUserByEmailArgs = {
  email: Scalars['EmailAddress']['input'];
};

export type QueryGetUserByIdArgs = {
  id: Scalars['ObjectID']['input'];
};

export type QueryIsUsernameAvailableArgs = {
  username: Scalars['String']['input'];
};

export enum Role {
  ActivityOwner = 'ACTIVITY_OWNER',
  Admin = 'ADMIN',
  ForumModerator = 'FORUM_MODERATOR',
  User = 'USER',
}

export type UpdatePingInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  latitude?: InputMaybe<Scalars['Latitude']['input']>;
  longitude?: InputMaybe<Scalars['Longitude']['input']>;
  media?: InputMaybe<Array<InputMaybe<MediaInput>>>;
  picks?: InputMaybe<Array<Scalars['String']['input']>>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  picks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  usename?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ObjectID']['output'];
  isRegistered: Scalars['Boolean']['output'];
  name?: Maybe<Name>;
  picks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  picture?: Maybe<Scalars['String']['output']>;
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'User';
    id: string;
    email: string;
    username: string;
    role: Role;
    picture?: string | null;
    isRegistered: boolean;
    picks?: Array<string | null> | null;
    name?: { __typename?: 'Name'; firstName: string; lastName: string } | null;
  };
};

export type IsUsernameAvailableQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;

export type IsUsernameAvailableQuery = {
  __typename?: 'Query';
  isUsernameAvailable: boolean;
};

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['EmailAddress']['input'];
}>;

export type GetUserByEmailQuery = {
  __typename?: 'Query';
  getUserByEmail?: {
    __typename?: 'User';
    id: string;
    email: string;
    username: string;
    role: Role;
    picture?: string | null;
    isRegistered: boolean;
    picks?: Array<string | null> | null;
    name?: { __typename?: 'Name'; firstName: string; lastName: string } | null;
  } | null;
};

export type CreatePingMutationVariables = Exact<{
  createPingInput: CreatePingInput;
}>;

export type CreatePingMutation = {
  __typename?: 'Mutation';
  createPing: string;
};

export type UpdatePingMutationVariables = Exact<{
  updatePingInput: UpdatePingInput;
}>;

export type UpdatePingMutation = {
  __typename?: 'Mutation';
  updatePing: string;
};

export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createUserInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createUserInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createUserInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'picture' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isRegistered' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'picks' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const IsUsernameAvailableDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'isUsernameAvailable' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'isUsernameAvailable' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'username' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'username' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IsUsernameAvailableQuery,
  IsUsernameAvailableQueryVariables
>;
export const GetUserByEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserByEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'EmailAddress' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUserByEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'picture' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isRegistered' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'picks' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const CreatePingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createPing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createPingInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreatePingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'createPingInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'createPingInput' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePingMutation, CreatePingMutationVariables>;
export const UpdatePingDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updatePing' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updatePingInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdatePingInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePing' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updatePingInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updatePingInput' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePingMutation, UpdatePingMutationVariables>;
