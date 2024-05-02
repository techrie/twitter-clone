import { useSelector } from "react-redux";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

import { fetchUser, fetchUserPosts, deletePost } from "./FetchUser";

const DisplayUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);

  const user = useSelector((store) => store.user);
  // console.log(JSON.stringify(user.uid) + "from DisplayUserPage.....");

  // let postId = "abc"; // get the post id from fetchUserPosts

  const handleEditPost = () => {};
  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  const fetchUserDetails = async () => {
    const userInfo = await fetchUser(user?.uid);
    console.log(JSON.stringify(userInfo) + "from fetchUser");
    return JSON.stringify(userInfo);
  };

  const getUserPosts = async () => {
    const allPosts = await fetchUserPosts(user?.uid);
    // console.log(Object.values(allPosts));
    console.log(JSON.stringify(allPosts) + "fetching all Posts for a user");
    return JSON.stringify(allPosts);
  };

  useEffect(() => {
    const singleUserInfo = fetchUserDetails();
    setUserInfo(singleUserInfo);

    const newPosts = getUserPosts();
    setPosts(Array.from(newPosts));
  }, []);

  // {"email":"mark@gmail.com","follows":[""],"username":"mark","displayName":"Mark","uid":"wf6c5x7OcphqWJReRdr7z16ZB1N2"}

  return (
    <div className="profile-container">
      <div>
        <h1>User Profile with avatar, no of followers, no of tweets</h1>

        <img src="" />
        <h3>{userInfo.displayName}</h3>
      </div>

      <div>
        <TweetBox />
      </div>

      <div>
        <h3>My Posts</h3>
        {posts?.map((post) => {
          return (
            <div>
              <h1>Poojitha</h1>
              <Post
                key={nanoid()}
                authorId={post.authorId}
                displayName={post.displayName}
                username={post.username}
                verified={post.verified}
                text={post.text}
                image={post.image}
                avatar={post.avatar}
                createdAt={post.createdAt}
              />
              <div>
                <button onClick={() => handleEditPost(post.id)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DisplayUser;
