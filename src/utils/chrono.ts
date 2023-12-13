import moment from 'moment';
export const getRelativeTime = (time: Date) => {
  moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

  const relativeTime = moment(time).fromNow();

  return relativeTime;
};
