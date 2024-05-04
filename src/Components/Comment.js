import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const Comment = ({
  commentId,
  userId,
  commentText,
  username,
  displayName,
  createdAt,
  avatar,
  verified,
}) => {
  return (
    <div>
      Comment
      <div className="comment">
        <div className="comment-avatar">
          <Avatar src={avatar} />
        </div>

        <div className="commentBody">
          <div className="commentHeader">
            <div className="commentHeaderText">
              <h4>
                {displayName}
                <span className="commentHeaderUserName">
                  {verified && <VerifiedUserIcon className="comment-badge" />} @
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

            <div className="commentHeaderDescription">
              <p>{commentText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comment;
