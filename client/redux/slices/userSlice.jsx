import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = { user: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserInfos: (state, action) => {
      const { user } = action.payload;
      return user ? { ...state, user } : { ...state };
    },
    updateUserInfos: (state, action) => {
      const data = action.payload;
      let newState = { ...state, ...data };
      return newState;
    },
    removeUserInfos: () => {
      return initialState;
    },
  },
});

export const { fetchUserInfos, updateUserInfos, removeUserInfos } =
  userSlice.actions;
export default userSlice.reducer;
