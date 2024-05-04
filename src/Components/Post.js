import { Avatar } from "@mui/material";
import "./Post.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useState } from "react";
import Comments from "./Comments";

const Post = ({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  createdAt,
  comments,
}) => {
  const [commentBox, setCommentBox] = useState(false);
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
          <ChatBubbleOutlineIcon />
          <RepeatIcon />
          <FavoriteBorderIcon />
          <PublishIcon />

          {/* <Comments /> */}
        </div>
        {comments && comments.length !== 0 && <Comments />}
      </div>
    </div>
  );
};
export default Post;
