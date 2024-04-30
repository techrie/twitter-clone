import { Avatar, Button } from "@mui/material";
import "./TweetBox.css";

const TweetBox = () => {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox-input">
          <Avatar src="" />
          <input type="text" placeholder="What is happening?!" />
        </div>
        <input
          type="text"
          className="tweetInput-Img"
          placeholder="Enter Img URL"
        />
        <Button type="submit" className="tweetBoxBtn">
          Post
        </Button>
      </form>
    </div>
  );
};
export default TweetBox;
