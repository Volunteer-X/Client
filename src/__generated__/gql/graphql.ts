/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date | string; output: Date | string; }
  EmailAddress: { input: string; output: string; }
  Latitude: { input: string; output: string; }
  Longitude: { input: string | number; output: string | number; }
  ObjectID: { input: string; output: string; }
  URL: { input: URL | string; output: URL | string; }
};

export type CreatePingInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Latitude']['input'];
  longitude: Scalars['Longitude']['input'];
  picks: Array<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['URL']['input']>;
  userID: Scalars['ObjectID']['input'];
};

export type CreateUserInput = {
  device: Scalars['String']['input'];
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  picks: Array<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
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
  createPing: Ping;
  createUser: User;
  removeUser?: Maybe<User>;
  updatePing: Ping;
  updateUser: User;
};


export type MutationCreatePingArgs = {
  payload: CreatePingInput;
};


export type MutationCreateUserArgs = {
  payload: CreateUserInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['ObjectID']['input'];
};


export type MutationUpdatePingArgs = {
  id: Scalars['ObjectID']['input'];
  payload: UPingInput;
};


export type MutationUpdateUserArgs = {
  payload: UpdateUserInput;
};

export type Name = {
  __typename?: 'Name';
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Ping = {
  __typename?: 'Ping';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ObjectID']['output'];
  latitude: Scalars['Latitude']['output'];
  longitude: Scalars['Longitude']['output'];
  media?: Maybe<Array<Maybe<Media>>>;
  picks: Array<Scalars['String']['output']>;
  radius?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['URL']['output']>;
  user?: Maybe<User>;
  userID: Scalars['ID']['output'];
};

export type PingConnection = {
  __typename?: 'PingConnection';
  edges: Array<PingEdge>;
  owner: User;
  pageInfo: PageInfo;
};

export type PingEdge = {
  __typename?: 'PingEdge';
  cursor: Scalars['String']['output'];
  node: Ping;
};

export type Query = {
  __typename?: 'Query';
  getAllPing: PingConnection;
  getPing: Ping;
  getUser: User;
  getUserByEmail?: Maybe<User>;
  isUsernameAvailable: Scalars['Boolean']['output'];
};


export type QueryGetAllPingArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryGetPingArgs = {
  id: Scalars['ObjectID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ObjectID']['input'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['EmailAddress']['input'];
};


export type QueryIsUsernameAvailableArgs = {
  username: Scalars['String']['input'];
};

export type UPingInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Latitude']['input']>;
  longitude?: InputMaybe<Scalars['Longitude']['input']>;
  media?: InputMaybe<Array<InputMaybe<MediaInput>>>;
  picks?: InputMaybe<Array<Scalars['String']['input']>>;
  radius?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

export type UpdateUserInput = {
  devices?: InputMaybe<Array<Scalars['String']['input']>>;
  email?: InputMaybe<Scalars['EmailAddress']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  picks?: InputMaybe<Array<Scalars['String']['input']>>;
  picture?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  devices?: Maybe<Array<Scalars['String']['output']>>;
  email: Scalars['EmailAddress']['output'];
  id: Scalars['ObjectID']['output'];
  name?: Maybe<Name>;
  picks: Array<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  pings?: Maybe<Array<Maybe<Ping>>>;
  username: Scalars['String']['output'];
};

export type GetAllPingQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllPingQuery = { __typename?: 'Query', getAllPing: { __typename?: 'PingConnection', pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean }, edges: Array<{ __typename?: 'PingEdge', cursor: string, node: { __typename?: 'Ping', id: string, title: string, description?: string | null, createdAt?: Date | string | null, latitude: string, longitude: string | number, picks: Array<string>, radius?: number | null, url?: URL | string | null, media?: Array<{ __typename?: 'Media', key: string, type: string } | null> | null } }>, owner: { __typename?: 'User', id: string, createdAt?: Date | string | null, username: string, email: string, picture?: string | null, picks: Array<string>, name?: { __typename?: 'Name', firstName: string, lastName: string, middleName?: string | null } | null } } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, username: string, picture?: string | null, picks: Array<string>, createdAt?: Date | string | null, name?: { __typename?: 'Name', firstName: string, lastName: string, middleName?: string | null } | null } };

export type IsUsernameAvailableQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type IsUsernameAvailableQuery = { __typename?: 'Query', isUsernameAvailable: boolean };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['EmailAddress']['input'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', getUserByEmail?: { __typename?: 'User', id: string, email: string, username: string, picture?: string | null, picks: Array<string>, createdAt?: Date | string | null, name?: { __typename?: 'Name', firstName: string, lastName: string, middleName?: string | null } | null } | null };

export type CreatePingMutationVariables = Exact<{
  createPingInput: CreatePingInput;
}>;


export type CreatePingMutation = { __typename?: 'Mutation', createPing: { __typename?: 'Ping', id: string } };

export type UpdatePingMutationVariables = Exact<{
  id: Scalars['ObjectID']['input'];
  UPingInput: UPingInput;
}>;


export type UpdatePingMutation = { __typename?: 'Mutation', updatePing: { __typename?: 'Ping', id: string, createdAt?: Date | string | null, title: string, description?: string | null, picks: Array<string>, latitude: string, longitude: string | number, media?: Array<{ __typename?: 'Media', key: string, type: string } | null> | null, user?: { __typename?: 'User', id: string, username: string, picture?: string | null, name?: { __typename?: 'Name', lastName: string, firstName: string } | null } | null } };

export type UpdateUserMutationVariables = Exact<{
  payload: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, devices?: Array<string> | null, email: string, createdAt?: Date | string | null, picks: Array<string>, picture?: string | null, username: string, name?: { __typename?: 'Name', firstName: string, lastName: string, middleName?: string | null } | null } };


export const GetAllPingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picks"}},{"kind":"Field","name":{"kind":"Name","value":"radius"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"picks"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPingQuery, GetAllPingQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"picks"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const IsUsernameAvailableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"isUsernameAvailable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUsernameAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>;
export const GetUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailAddress"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"picks"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const CreatePingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPingInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreatePingMutation, CreatePingMutationVariables>;
export const UpdatePingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UPingInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UPingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UPingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"picks"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePingMutation, UpdatePingMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"devices"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"picks"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;