import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, ECharacter } from '../../../lib';

export interface CharacterState {
  isSelected: boolean;
  label: string;
}

const initialState: CharacterState[] = [
  {
    isSelected: false,
    label: ECharacter.Animal.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Art.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Children.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Civil.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Culture.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Disaster.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Economic.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Education.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Environment.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Health.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Human.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Politics.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Poverty.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Science.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Social.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Technology.toString(),
  },
  {
    isSelected: false,
    label: ECharacter.Women.toString(),
  },
];

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    onSelection: (state, action: PayloadAction<string>) => {
      let index = state.findIndex(
        character => action.payload === character.label,
      );
      state[index].isSelected = !state[index].isSelected;
    },
  },
});

export const { onSelection } = characterSlice.actions;

export default characterSlice.reducer;
