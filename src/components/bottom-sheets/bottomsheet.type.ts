import { Activity, User } from '@app/types/entities';

export type BottomSheetRefProps = {
  openModal: () => void;
};

export type settingProps = {
  isOwner?: boolean;
};

export type ActivityBottomSheetRef = {
  openModal: (activity: Activity, creator: User) => void;
  data: { activity: Activity; creator: User };
};
