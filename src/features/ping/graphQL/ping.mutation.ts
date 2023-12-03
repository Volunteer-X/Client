import { gql } from '@app/__generated__/gql';

const CREATE_PING = gql(`
mutation createPing($createPingInput: CreatePingInput!) {
    createPing(createPingInput: $createPingInput) 
    }
    `);

const UPDATE_PING = gql(`
mutation updatePing($updatePingInput: UpdatePingInput!) {
    updatePing(updatePingInput: $updatePingInput)
    }`);

export { CREATE_PING, UPDATE_PING };
