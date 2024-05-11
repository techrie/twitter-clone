import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    checkIsFollowing: false,
    isBioChanged: false,
  },
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    checkFollowing: (state, action) => {
      state.checkIsFollowing = action.payload;
    },
    bioChanged: (state, action) => {
      state.isBioChanged = action.payload;
    },
  },
});

export const { addUser, removeUser, checkFollowing, bioChanged } =
  userSlice.actions;
export default userSlice.reducer;

/*
initialState: null,
*/
