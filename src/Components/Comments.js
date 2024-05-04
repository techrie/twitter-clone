import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import db from "../utils/firebase";

const Comments = () => {
  const [comments, setComments] = useState([]);

  const user = useSelector((store) => store.user);
  console.log(user?.uid + "  from Comments.....");

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setComments(snapshot?.docs.map((doc) => doc.data().comments));
    });
  }, []);

  return (
    <div className="comments-container">
      {comments &&
        comments.length !== 0 &&
        comments.map((comment) => (
          <CommentInput
            key={nanoid()}
            displayName={user.displayName}
            username={user.username}
            commentText={comment.text}
            createdAt={comment.createdAt}
          />
        ))}
    </div>
  );
};
export default Comments;
