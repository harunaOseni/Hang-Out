import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      user: null,
    },
  },
  reducer: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    logAuthUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { setAuthUser, logAuthUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
