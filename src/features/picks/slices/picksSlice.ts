import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Array<string> = [];

export const picksSlice = createSlice({
  name: 'picks',
  initialState,
  reducers: {
    setUserPicks: (state, action: PayloadAction<Array<string>>) => {
      state = action.payload;
    },
  },
});

export const { setUserPicks } = picksSlice.actions;

export default picksSlice.reducer;
