import { useState } from "react";
import db from "../utils/firebase";

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
    <div>
      <p>Edit Box</p>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
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
