import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "post",
  initialState: null,
  reducers: {
    addUserFollowees: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUserFollowees } = postsSlice.actions;
export default postsSlice.reducer;
