import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = { user: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfos: (state, action) => {
      const { user } = action.payload;
      let nwe = { ...state };
      if (user) {
        nwe.user = user;
      }
      return nwe;
    },
    removeUserInfos: () => {
      return initialState;
    },
  },
});

export const { updateUserInfos, removeUserInfos } = userSlice.actions;
export default userSlice.reducer;
