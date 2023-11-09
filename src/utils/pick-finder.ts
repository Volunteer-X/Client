import { Pick, Picks } from '@app/lib';

export const findPickFromLabel = (label: string): Pick | undefined => {
  return Picks.find(val => val.label === label);
};
