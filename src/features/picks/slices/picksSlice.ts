import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EPicks } from '../../../lib';

export interface PickState {
  isSelected: boolean;
  label: string;
}

const initialState: PickState[] = [
  {
    isSelected: false,
    label: EPicks.Animal.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Art.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Children.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Civil.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Culture.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Disaster.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Economic.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Education.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Environment.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Health.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Human.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Politics.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Poverty.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Science.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Social.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Technology.toString(),
  },
  {
    isSelected: false,
    label: EPicks.Women.toString(),
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
