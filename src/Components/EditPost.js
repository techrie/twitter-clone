import { useState } from "react";
import db from "../utils/firebase";
import "./EditPost.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const EditPost = ({ post, setEditBox }) => {
  const [text, setText] = useState("");

  const editPosts = (post) => {
    db.collection("posts")
      .doc(post.id)
      .update(post)
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="edit-box">
      {/* <p>Edit Box</p> */}
      <input
        className="edit-input"
        type="text"
        placeholder="Enter text to be updated"
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
        Update Text
      </button>
    </div>
  );
};
export default EditPost;
