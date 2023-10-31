import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const tokenSlice = createSlice({
  name: "token",
  initialState: {},
  reducers: {
    updateToken: (state, action) => {
      const data = action.payload;
      return data;
    },
    removeToken: () => {
      return initialState;
    },
  },
});

export const { updateToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
