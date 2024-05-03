import { useSelector } from "react-redux";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DisplayUser.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { fetchUser, fetchUserPosts, deletePost } from "./FetchUser";
import User from "./User";

const DisplayUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);

  const user = useSelector((store) => store.user);
  // console.log(JSON.stringify(user.uid) + "from DisplayUserPage.....");

  const handleEditPost = () => {};
  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  const fetchUserDetails = async () => {
    const userInf = await fetchUser(user?.uid);
    // console.log(userInf + "  from FetchUserDet");
    // console.log(JSON.stringify(userInf) + "from fetchUser");
    setUserInfo(JSON.stringify(userInf));
  };

  const getUserPosts = async () => {
    const allPosts = await fetchUserPosts(user?.uid);
    // console.log(allPosts + "  from getUserPosts");
    setPosts(Array.from(allPosts));
    // console.log(JSON.stringify(allPosts) + "fetching all Posts for a user");
  };

  useEffect(() => {
    fetchUserDetails();
    getUserPosts();
  }, []);

  console.log(userInfo + " from display user");
  // {"email":"mark@gmail.com","follows":[""],"username":"mark","displayName":"Mark","uid":"wf6c5x7OcphqWJReRdr7z16ZB1N2"}
  //   console.log(JSON.parse(userInfo));

  return (
    <div className="profile-container">
      <Link className="back-home" to="/home">
        <ArrowBackIcon />
      </Link>
      <div className="profile-box">
        <h1>User Profile with avatar, no of followers, no of tweets</h1>
        {/* <User displayName={JSON.parse(userInfo).displayName} /> */}
        <img
          className="user-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s"
        />
        <h1 className="user-name">{userInfo?.displayName}</h1>
      </div>

      <div className="tweet-box">
        <TweetBox />
      </div>

      <div>
        <h3>My Posts</h3>
        {posts?.map((post) => {
          //   console.log(post.id);
          return (
            <div>
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
