/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(payload: $createUserInput) {\n      id\n      email\n      username\n      name {\n        firstName\n        lastName\n      }\n      picture\n      picks\n    }\n  }\n": types.CreateUserDocument,
    "\n  query isUsernameAvailable($username: String!) {\n    isUsernameAvailable(username: $username)\n  }\n": types.IsUsernameAvailableDocument,
    "\nquery GetUserByEmail($email: EmailAddress!) {\n  getUserByEmail(email: $email) {\n    id\n    email\n    username\n    name {\n      firstName\n      lastName\n    }\n    picture\n    picks\n  }\n}\n": types.GetUserByEmailDocument,
    "\nmutation createPing($createPingInput: CreatePingInput!) {\n    createPing(payload: $createPingInput){\n        id\n        title\n        description\n        createdAt\n        user {\n            id\n            name {\n                firstName\n                lastName\n            }\n            username\n            picture\n        }\n    }\n    }\n    ": types.CreatePingDocument,
    "\nmutation updatePing($updatePingInput: UPingInput!) {\n    updatePing(id: string, payload: $updatePingInput) {\n        id\n        title\n        description\n        createdAt\n        user {\n            id\n            name {\n                firstName\n                lastName\n            }\n            username\n            picture\n        }\n    }\n    }": types.UpdatePingDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(payload: $createUserInput) {\n      id\n      email\n      username\n      name {\n        firstName\n        lastName\n      }\n      picture\n      picks\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(payload: $createUserInput) {\n      id\n      email\n      username\n      name {\n        firstName\n        lastName\n      }\n      picture\n      picks\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query isUsernameAvailable($username: String!) {\n    isUsernameAvailable(username: $username)\n  }\n"): (typeof documents)["\n  query isUsernameAvailable($username: String!) {\n    isUsernameAvailable(username: $username)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetUserByEmail($email: EmailAddress!) {\n  getUserByEmail(email: $email) {\n    id\n    email\n    username\n    name {\n      firstName\n      lastName\n    }\n    picture\n    picks\n  }\n}\n"): (typeof documents)["\nquery GetUserByEmail($email: EmailAddress!) {\n  getUserByEmail(email: $email) {\n    id\n    email\n    username\n    name {\n      firstName\n      lastName\n    }\n    picture\n    picks\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation createPing($createPingInput: CreatePingInput!) {\n    createPing(payload: $createPingInput){\n        id\n        title\n        description\n        createdAt\n        user {\n            id\n            name {\n                firstName\n                lastName\n            }\n            username\n            picture\n        }\n    }\n    }\n    "): (typeof documents)["\nmutation createPing($createPingInput: CreatePingInput!) {\n    createPing(payload: $createPingInput){\n        id\n        title\n        description\n        createdAt\n        user {\n            id\n            name {\n                firstName\n                lastName\n            }\n            username\n            picture\n        }\n    }\n    }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation updatePing($updatePingInput: UPingInput!) {\n    updatePing(id: string, payload: $updatePingInput) {\n        id\n        title\n        description\n        createdAt\n        user {\n            id\n            name {\n                firstName\n                lastName\n            }\n            username\n            picture\n        }\n    }\n    }"): (typeof documents)["\nmutation updatePing($updatePingInput: UPingInput!) {\n    updatePing(id: string, payload: $updatePingInput) {\n        id\n        title\n        description\n        createdAt\n        user {\n            id\n            name {\n                firstName\n                lastName\n            }\n            username\n            picture\n        }\n    }\n    }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;