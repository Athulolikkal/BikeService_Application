import { createSlice } from "@reduxjs/toolkit";

const adminAccessTokenSlice = createSlice({
  name: "adminAccessToken",
  initialState:null,
  reducers: {
    addAdminAccessToken: (state, action) => {
      return action.payload;
    },
    adminLogOut: () => {
      return null;
    },
  },
});

export const { addAdminAccessToken, adminLogOut } = adminAccessTokenSlice.actions;
export default adminAccessTokenSlice.reducer;
