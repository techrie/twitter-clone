import { Avatar, Button } from "@mui/material";
import "./TweetBox.css";
import { useState } from "react";
import db from "../utils/firebase";
import { useSelector } from "react-redux";
import "firebase/compat/firestore";

import firebase from "firebase/compat/app";

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImg, setTweetImg] = useState("");

  const user = useSelector((store) => store.user);

  console.log(user);

  const handlePost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      authorId: user?.uid,
      displayName: user?.displayName,
      username: user?.displayName.slice(0, 4).toLowerCase(),
      verified: true,
      text: tweetMessage,
      image: tweetImg,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s",
      createdAt: firebase.firestore.Timestamp.now(),
    });

    setTweetMessage("");
    setTweetImg("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox-input">
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s" />
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
        <Button type="submit" className="tweetBoxBtn" onClick={handlePost}>
          Post
        </Button>
      </form>
    </div>
  );
};
export default TweetBox;
