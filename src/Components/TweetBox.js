import { Avatar, Button } from "@mui/material";
import "./TweetBox.css";
import { useEffect, useState } from "react";
import db from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import "firebase/compat/firestore";

import firebase from "firebase/compat/app";
import { refreshPostEvent } from "../utils/postsSlice";

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImg, setTweetImg] = useState("");

  const user = useSelector((store) => store.user);

  const refreshPost = useSelector((store) => store.post.refreshPost);

  const dispatch = useDispatch();

  // console.log(user);

  const handlePost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      authorId: user?.uid,
      displayName: user?.displayName,
      username: user?.displayName
        ?.split(" ")
        .join("")
        .slice(0, 4)
        .toLowerCase(),
      verified: true,
      text: tweetMessage,
      image: tweetImg,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s",
      createdAt: firebase.firestore.Timestamp.now(),
      comments: [],
    });

    setTweetMessage("");
    setTweetImg("");
    dispatch(refreshPostEvent(false));
    dispatch(refreshPostEvent(true));
  };

  useEffect(() => {
    console.log(refreshPost);
  }, [refreshPost]);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox-input">
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s" />
          <input
            type="text"
            className="tweetBoxInputtext"
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
