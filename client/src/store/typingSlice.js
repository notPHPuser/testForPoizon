import { createSlice } from '@reduxjs/toolkit';

const typingSlice = createSlice({
  name: 'typing',
  initialState: {
    input: '',
    errors: 0,
    wpm: 0,
    startTime: null,
  },
  reducers: {
    setInput(state, action) {
      state.input = action.payload;
    },
    incrementErrors(state) {
      state.errors += 1;
    },
    setWPM(state, action) {
      state.wpm = action.payload;
    },
    setStartTime(state, action) {
      state.startTime = action.payload;
    },
    reset(state) {
      state.input = '';
      state.errors = 0;
      state.wpm = 0;
      state.startTime = null;
    },
  },
});

export const { setInput, incrementErrors, setWPM, setStartTime, reset } = typingSlice.actions;
export default typingSlice.reducer;
