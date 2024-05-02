import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { useEffect, useState } from "react";
import db from "../utils/firebase";
import { nanoid } from "nanoid";
const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot?.docs.map((doc) => doc.data()))
    );
  }, []);

  return (
    <div className="feed">
      <TweetBox />

      {posts.map((post) => (
        <Post
          key={nanoid()}
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          image={post.image}
          avatar={post.avatar}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};
export default Feed;
