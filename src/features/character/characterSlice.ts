import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, ECharacter } from '../../constants';

export interface CharacterState {
  isSelected: boolean;
  label: string;
}

const initialState: CharacterState[] = [
  {
    isSelected: false,
    label: ECharacter.Animal.toString(),
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
