import "./CommentInput.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import Post from "./Post";
import db from "../utils/firebase";
import { nanoid } from "nanoid";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { isCommentEdit } from "../utils/postsSlice";

const CommentInput = ({ post, setCommentBox, editCommentId }) => {
  const [comment, setComment] = useState("");

  const user = useSelector((store) => store.user);
  console.log(JSON.stringify(user) + " from CommentInput");

  const dispatch = useDispatch();

  const handleChangeComment = (post) => {
    // e.preventDefault();
    console.log(post, "postid");
    db.collection("posts")
      .doc(post.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          commentId: nanoid(),
          userId: user?.uid,
          commentText: comment,
          username: user?.displayName
            ?.split(" ")
            .join("")
            .slice(0, 4)
            .toLowerCase(),
          displayName: user?.displayName,
          createdAt: firebase.firestore.Timestamp.now(),
          avatar: user?.photoURL,
          verified: true,
        }),
      });
    dispatch(isCommentEdit(true));
  };

  return (
    <div className="comment">
      <form>
        <input
          type="text"
          className="comment-input"
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
            setCommentBox(!comment);
          }}
        >
          Reply
        </button>
      </form>
    </div>
  );
};
export default CommentInput;

//Not required
