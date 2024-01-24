import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ADD_PARTICIPANT } from '../graphQL/activity.mutation';
import { GET_PARTICIPANTS } from '../graphQL/activity.query';

type Member = {
  id: string;
  username: string;
  firstName: string | undefined;
  picture: string | undefined;
};
type ParticipantsInfo = {
  members?: Member[];
  totalCount: number;
};

export const useJoin = (activityId: string, userID: string) => {
  const [mutate, { data, error }] = useMutation(ADD_PARTICIPANT);
  const { data: participantData } = useQuery(GET_PARTICIPANTS, {
    variables: {
      activityId,
      first: undefined,
      after: undefined,
    },
  });

  const [participants, setParticipants] = useState<ParticipantsInfo>({
    members: undefined,
    totalCount: 0,
  });

  const [isJoined, setIsJoined] = useState<boolean>(false);

  useEffect(() => {
    if (
      !participantData ||
      participantData.getParticipants.totalCount === 0 ||
      !participantData.getParticipants.members
    ) {
      setParticipants({
        members: undefined,
        totalCount: 0,
      });
      return;
    }

    const members = participantData.getParticipants.members.map(member => ({
      id: member.id,
      username: member.username,
      firstName: member.name?.firstName,
      picture: member.picture !== null ? member.picture : undefined,
    }));
    const totalCount = participantData.getParticipants.totalCount;

    setParticipants({
      members,
      totalCount,
    });

    setIsJoined(members.some(member => member.id === userID));
  }, [isJoined, participantData, userID]);

  //   useEffect(() => {
  //     if (!isJoined) {
  //       console.log('useJoin::useEffect::isJoined', isJoined);

  //       setIsJoined(
  //         data?.addParticipant
  //           ? data.addParticipant
  //           : Boolean(data?.addParticipant),
  //       );
  //     }
  //   }, [data, isJoined]);

  //   const getParticipants = async (activityId: string) => {
  //     const { data: result } = await _getParticipants({
  //       variables: {
  //         activityId,
  //         first: undefined,
  //         after: undefined,
  //       },
  //     });
  //   };

  const join = (activityID: string, userId: string) => {
    mutate({
      variables: {
        activityID,
        userId,
      },
      optimisticResponse: {
        addParticipant: true,
      },
    });
  };

  return { participants, join, isJoined: isJoined, error };
};
