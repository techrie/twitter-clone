import { Avatar } from "@mui/material";
import "./Post.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useEffect, useState } from "react";
import Comments from "./Comments";
import CommentInput from "./CommentInput";
import { useSelector } from "react-redux";

const Post = ({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  createdAt,
  comments,
  id,
}) => {
  const [commentBox, setCommentBox] = useState(false);
  const isComment = useSelector((store) => store.isComment);
  useEffect(() => {}, [isComment]);
  return (
    <div className="post">
      <div className="post-avatar">
        <Avatar src={avatar} />
      </div>

      <div className="postBody">
        <div className="postHeader">
          <div className="postHeaderText">
            <h4>
              {displayName}
              <span className="postHeaderUserName">
                {verified && <VerifiedUserIcon className="post-badge" />} @
                {username}
              </span>
            </h4>

            <p>
              {new Date(
                createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
              ).toLocaleDateString("en-US")}
              <span className="time">
                {new Date(
                  createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
                ).toLocaleTimeString()}
              </span>
              {/* fireBaseTime.toLocaleTimeString() */}
            </p>
          </div>

          <div className="postHeaderDescription">
            <p>{text}</p>
          </div>
        </div>
        <img
          // src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhqdWp4cXVtaWh5N29uMTVwdDN1bW5pcTdlczg2dmhmaTM1MTBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JQYJwMKXRmb1viBSBJ/giphy.gif"
          src={image}
        />

        <div className="postFooter">
          <ChatBubbleOutlineIcon onClick={() => setCommentBox(!commentBox)} />
          <RepeatIcon />
          <FavoriteBorderIcon />
          {/* <PublishIcon /> */}

          {commentBox && (
            <CommentInput
              post={{
                displayName,
                username,
                verified,
                text,
                image,
                avatar,
                createdAt,
                comments,
                id,
              }}
              setCommentBox={setCommentBox}
            />
          )}

          {/* <Comments /> */}
        </div>

        {comments && comments.length !== 0 && <Comments comments={comments} />}
      </div>
    </div>
  );
};
export default Post;
