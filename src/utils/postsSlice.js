import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "post",
  initialState: {
    isEditMode: false,
    isComment: false,
    posts: [],
    refreshPost: false,
  },
  reducers: {
    inEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    setPostsData: (state, action) => {
      state.posts = action.payload;
    },
    isCommentEdit: (state, action) => {
      state.isComment = action.payload;
    },
    refreshPostEvent: (state, action) => {
      state.refreshPost = action.payload;
    },
  },
});

export const { inEditMode, setPostsData, isCommentEdit, refreshPostEvent } =
  postsSlice.actions;
export default postsSlice.reducer;
