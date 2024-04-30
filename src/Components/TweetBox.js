import { Avatar, Button } from "@mui/material";
import "./TweetBox.css";
import { useState } from "react";
import db from "../utils/firebase";

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImg, setTweetImg] = useState("");

  const handleTweet = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      displayName: "Peggy Sue",
      username: "pegg",
      verified: true,
      text: tweetMessage,
      image: tweetImg,
      avatar: "",
    });

    setTweetMessage("");
    setTweetImg("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox-input">
          <Avatar src="" />
          <input
            type="text"
            placeholder="What is happening?!"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="tweetInput-Img"
          placeholder="Enter Img URL"
          value={tweetImg}
          onChange={(e) => setTweetImg(e.target.value)}
        />
        <Button type="submit" className="tweetBoxBtn" onClick={handleTweet}>
          Post
        </Button>
      </form>
    </div>
  );
};
export default TweetBox;
