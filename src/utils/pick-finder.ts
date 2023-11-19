import { Pick, Picks } from '@app/lib';

export const findPickFromLabel = (label: string): Pick => {
  return Picks.find(val => val.label === label) as Pick;
};
