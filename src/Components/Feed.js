import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { useEffect, useState } from "react";
import db from "../utils/firebase";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  //Uncomment the below line later
  // const post = useSelector((store) => store.post);
  // console.log(JSON.stringify(post) + "  from Feed js.....");

  const post = {
    followees: ["AcDWavFxwyXh0TulBbvRVZy2ELm1", "3FHqMPGxBQXTwMsaqU4Rn5rxA4J3"],
  };
  console.log(
    post.followees.indexOf("3FHqMPGxBQXTwMsaqU4Rn5rxA4J3") +
      " from posting followees feed js"
  );

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot?.docs
          .map((doc) => doc.data())
          .filter(function (doc) {
            console.log(
              JSON.stringify(doc.authorId) + " printing doc feed js useEffect"
            );
            return post.followees.indexOf(doc.authorId) >= 0;
          })
      );
      // setPosts(snapshot?.docs.map((doc) => doc.data()));
    });
  }, []);

  // useEffect(() => {
  //   db.collection("posts").onSnapshot((snapshot) => {
  //     setPosts(snapshot?.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  useEffect(() => {
    console.log(posts, "posts");
  }, [posts]);

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
          comments={post.comments}
        />
      ))}
    </div>
  );
};
export default Feed;
