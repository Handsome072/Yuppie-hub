import { createSlice } from "@reduxjs/toolkit";
const initialState = { token: null, user: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfos: (state, action) => {
      const { user, token } = action.payload;
      if (user) {
        state.user = user;
      }
      if (token) {
        state.token = token;
      }
      return state;
    },
    removeUserInfos: () => {
      return initialState;
    },
  },
});

export const { updateUserInfos, removeUserInfos } = userSlice.actions;

export default userSlice.reducer;
