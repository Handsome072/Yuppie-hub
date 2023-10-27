"use client";
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
  },
});

export const { updateUserInfos } = userSlice.actions;

export default userSlice.reducer;
