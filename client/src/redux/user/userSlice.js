import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  err: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.err = null;
    },
    signInFailure: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
