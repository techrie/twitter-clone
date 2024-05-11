import { useState } from "react";
import db from "../utils/firebase";
import "./EditPost.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { inEditMode } from "../utils/postsSlice";
import { useDispatch } from "react-redux";

const EditPost = ({ post, setEditBox, editId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const editPosts = (post) => {
    db.collection("posts")
      .doc(post.id)
      .update(post)
      .catch((err) => {
        console.log(err);
      });
    dispatch(inEditMode(true));
  };

  return (
    <div className="edit-box">
      {/* <p>Edit Box</p> */}
      <input
        className="edit-input"
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn-updateText"
        onClick={() => {
          editPosts({ ...post, text: text });
          setEditBox(false);
        }}
      >
        Update Post
      </button>
    </div>
  );
};
export default EditPost;

//Not required
