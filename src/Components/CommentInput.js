import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import Post from "./Post";

const CommentInput = () => {
  const [comment, setComment] = useState("");

  const user = useSelector((store) => store.user);
  console.log(user + " from CommentInput");

  return (
    <div className="comment whiteBg">
      <div className="flex flex-row items-center">
        <div className="comment-avatar w-12 h-12 overflow-hidden rounded-lg m-4">
          <Avatar src="" />
          {/* {user && user.profilePicture} */}
        </div>
        <div className="w-full">
          <form
            className="px-4"
            onSubmit={(e) => {
              e.preventDefault();
              // postTweet(user.uid, comment, null, tweetID);
              <Post />;
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
