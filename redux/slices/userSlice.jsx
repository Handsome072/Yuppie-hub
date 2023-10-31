import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfos: (state, action) => {
      const data = action.payload;
      return data;
    },
    removeUserInfos: () => {
      return initialState;
    },
  },
});

export const { updateUserInfos, removeUserInfos } = userSlice.actions;

export default userSlice.reducer;
