import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed-header">
        <h3>Home</h3>
      </div>

      <TweetBox />
      <Post />
      <Post />
      <Post />
    </div>
  );
};
export default Feed;
