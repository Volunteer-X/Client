import { Activity } from '@app/types/entities';

export type BottomSheetRefProps = {
  openModal: () => void;
};

export type settingProps = {
  isOwner?: boolean;
};

export type ActivityBottomSheetRef = BottomSheetRefProps & {
  setActivity: (activity: Activity) => void;
};
