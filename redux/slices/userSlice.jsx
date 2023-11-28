import { createSlice } from "@reduxjs/toolkit";
const initialState = { user: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserInfos: (state, action) => {
      const { user } = action.payload;
      let nweState = { ...state };
      nweState.user = user;
      return nweState;
    },
    updateUserInfos: (state, action) => {
      const { user } = action.payload;
      let nweState = { ...state };
      nweState.user = { ...state.user, ...user };
      return nweState;
    },
    removeUserInfos: () => {
      return initialState;
    },
  },
});

export const { fetchUserInfos, updateUserInfos, removeUserInfos } =
  userSlice.actions;
export default userSlice.reducer;
