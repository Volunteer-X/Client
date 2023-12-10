import { gql } from '@app/__generated__/gql';

const CREATE_PING = gql(`
mutation createPing($createPingInput: CreatePingInput!) {
    createPing(payload: $createPingInput){
        id
        title
        description
        createdAt
        user {
            id
            name {
                firstName
                lastName
            }
            username
            picture
        }
    }
    }
    `);

const UPDATE_PING = gql(`
mutation updatePing($updatePingInput: UPingInput!) {
    updatePing(id: string, payload: $updatePingInput) {
        id
        title
        description
        createdAt
        user {
            id
            name {
                firstName
                lastName
            }
            username
            picture
        }
    }
    }`);

export { CREATE_PING, UPDATE_PING };
