import { gql } from '@app/__generated__/gql';

export const ADD_PARTICIPANT = gql(`
mutation AddParticipant($activityID: ObjectID!, $userId: ObjectID!) {
  addParticipant(id: $activityID, userID: $userId) 
}`);
