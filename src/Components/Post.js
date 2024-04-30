import { Avatar } from "@mui/material";
import "./Post.css";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Post = () => {
  return (
    <div className="post">
      <div className="post-avatar">
        <Avatar src="" />
      </div>

      <div className="postBody">
        <div className="postHeader">
          <div className="postHeaderText">
            <div className="postHeaderInfo">
              <h4>
                Name
                <span className="postHeaderUserName">
                  <VerifiedUserIcon className="post-badge" />
                  @Name
                </span>
              </h4>
            </div>

            <div className="postHeaderOptions">
              <MoreHorizIcon />
            </div>
          </div>

          <div className="postHeaderDescription">
            <p>Have a great day!</p>
          </div>
        </div>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhqdWp4cXVtaWh5N29uMTVwdDN1bW5pcTdlczg2dmhmaTM1MTBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JQYJwMKXRmb1viBSBJ/giphy.gif"
          alt="postImg"
        />

        <div className="postFooter">
          <ChatBubbleOutlineIcon />
          <RepeatIcon />
          <FavoriteBorderIcon />
          <PublishIcon />
        </div>
      </div>
    </div>
  );
};
export default Post;
