import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import db from "../utils/firebase";
import Post from "./Post";

const Comments = ({ comments }) => {
  // const [comments, setComments] = useState([]);

  const user = useSelector((store) => store.user);
  // console.log(user?.uid + "  from Comments.....");

  useEffect(() => {
    // db.collection("posts").onSnapshot((snapshot) => {
    //   setComments(snapshot?.docs.map((doc) => doc.data().comments));
    // });
  }, []);

  // displayName.split(" ").join("");

  return (
    <div className="comments-container">
      {comments &&
        comments.length !== 0 &&
        comments?.map((comment) => (
          <Comment
            key={nanoid()}
            displayName={comment?.displayName}
            username={comment?.displayName
              ?.split(" ")
              .join("")
              .slice(0, 4)
              .toLowerCase()}
            commentText={comment?.commentText}
            createdAt={comment?.createdAt}
            // verified={}
            avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s"
          />
        ))}
    </div>
  );
};
export default Comments;

/*
return (
    <div className="comments-container">
      {comments &&
        comments.length !== 0 &&
        comments.map((comment) => (
          <div>
            <Comment
              key={nanoid()}
              displayName={user.displayName}
              username={user.username}
              commentText={comment.text}
              createdAt={comment.createdAt}
              verified={}
              avatar=""
            />
            <button onClick={handleCommentClick}>Comment</button>
          </div>
        ))}
    </div>
  );
  */
