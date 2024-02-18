import { RetryLink } from '@apollo/client/link/retry';

export const retryLink = new RetryLink({
  delay: {
    initial: 100,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 1,
    retryIf: (error, operation) => {
      console.log('error', error);
      console.log('operation', operation);

      return false;
    },
  },
});
