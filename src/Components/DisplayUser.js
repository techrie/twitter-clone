import { useSelector } from "react-redux";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DisplayUser.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { fetchUser, fetchUserPosts, deletePost, editPost } from "./FetchUser";
import User from "./User";
import EditPost from "./EditPost";
import CommentInput from "./CommentInput";

const DisplayUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);

  const [editBox, setEditBox] = useState(false);

  const [commentBox, setCommentBox] = useState(false);

  const user = useSelector((store) => store.user);
  // console.log(JSON.stringify(user) + "from DisplayUserPage.....");

  // const handleComment = () => {
  //   setCommentBox(true);
  // };

  const getUserPosts = async () => {
    const allPosts = await fetchUserPosts(user?.uid);
    // console.log(allPosts + "  from getUserPosts");
    setPosts(Array.from(allPosts));
    // console.log(JSON.stringify(allPosts) + "fetching all Posts for a user");
  };

  const handleEditPost = (postId) => {
    editPost(postId);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
    getUserPosts();
  };

  const fetchUserDetails = async () => {
    const userInf = await fetchUser(user?.uid);
    // console.log(userInf + "  from FetchUserDet");
    // console.log(JSON.stringify(userInf) + "from fetchUser");
    setUserInfo(JSON.stringify(userInf));
  };

  useEffect(() => {
    fetchUserDetails();
    getUserPosts();
  }, []);

  // console.log(userInfo + " from display user");

  //   const data_from_child = (data) => {
  //     console.log(data); // or set the data to a state
  //     // alert();
  //     getUserPosts();
  //   };

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
        <p>{userInfo?.PostsCount} </p>
        <p>{userInfo?.followerCount}</p>
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
                createdAt={new Date(
                  post.createdAt?.seconds * 1000 +
                    post.createdAt?.nanoseconds / 1000000
                ).toLocaleDateString("en-US")}
              />
              <div>
                <button onClick={() => setEditBox(true)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
                {editBox && <EditPost post={post} setEditBox={setEditBox} />}
                <button onClick={() => setCommentBox(true)}>Comment</button>
                {commentBox && (
                  <CommentInput post={post} setCommentBox={setCommentBox} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DisplayUser;
