import { createSlice } from "@reduxjs/toolkit";

interface userData {
  userId?: string;
  userName?: string;
  email?: string;
  phone?: string;
}

const initialState: userData = {
  userId: undefined,
  userName: undefined,
  email: undefined,
  phone: undefined,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      return action.payload;
    },
    removeUserInfo: () => {
      return {};
    },
  },
});

export const { addUserInfo, removeUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
