import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PicksLabel } from '../../../lib';

export interface PickState {
  isSelected: boolean;
  label: string;
}

const initialState: PickState[] = [
  {
    isSelected: false,
    label: PicksLabel.Animal,
  },
  {
    isSelected: false,
    label: PicksLabel.Art,
  },
  {
    isSelected: false,
    label: PicksLabel.Children,
  },
  {
    isSelected: false,
    label: PicksLabel.Civil.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Culture.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Disaster.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Economic.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Education.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Environment.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Health.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Human.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Politics.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Poverty.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Science.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Social.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Technology.toString(),
  },
  {
    isSelected: false,
    label: PicksLabel.Women.toString(),
  },
];

export const picksSlice = createSlice({
  name: 'picks',
  initialState,
  reducers: {
    onSelection: (state, action: PayloadAction<string>) => {
      let index = state.findIndex(picks => action.payload === picks.label);
      state[index].isSelected = !state[index].isSelected;
    },
  },
});

export const { onSelection } = picksSlice.actions;

export default picksSlice.reducer;
