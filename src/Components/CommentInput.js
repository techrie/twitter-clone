import "./CommentInput.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import Post from "./Post";
import db from "../utils/firebase";
import { nanoid } from "nanoid";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const CommentInput = ({ post, setCommentBox }) => {
  const [comment, setComment] = useState("");

  const user = useSelector((store) => store.user);
  console.log(JSON.stringify(user) + " from CommentInput");

  const handleChangeComment = (post) => {
    db.collection("posts")
      .doc(post.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          commentId: nanoid(),
          userId: user?.uid,
          commentText: comment,
          // username: user?.username,
          displayName: user?.displayName,
          createdAt: firebase.firestore.Timestamp.now(),
          avatar: user?.photoURL,
          verified: true,
        }),
      });
  };

  return (
    <div className="comment">
      <input
        type="text"
        className="comment-input form-control mt-4 mb-5"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder="Add a comment"
      />
      <button
        className="btn-reply"
        onClick={() => {
          handleChangeComment(post);
          setCommentBox(false);
        }}
      >
        Reply
      </button>
    </div>
  );
};
export default CommentInput;

/*
<div className="bg-white">
  <div className="flex flex-row items-center">
    <div className="w-12 h-12 overflow-hidden rounded-lg m-4">
      <Avatar src={user && user.profilePicture} />
    </div>
    <div className="w-full">
      <form
        className="px-4"
        onSubmit={(e) => {
          e.preventDefault();
          postTweet(user.uid, comment, null, tweetID);
          <Post />
          setComment("");
        }}
      >
        <input
          className="bg-gray-200 placeholder-gray-600  rounded-lg h-12 w-full font-noto text-sm font-medium"
          type="text"
          placeholder="Tweet your Reply"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </div>
  </div>
</div>;

*/
