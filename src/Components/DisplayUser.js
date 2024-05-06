import { useDispatch, useSelector } from "react-redux";
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
import { inEditMode } from "../utils/postsSlice";

const DisplayUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);

  const [editBox, setEditBox] = useState(false);

  const [commentBox, setCommentBox] = useState(false);
  const [editId, setEditId] = useState("");

  const dispatch = useDispatch();

  const isEditMode = useSelector((store) => store.post);

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
    dispatch(inEditMode(false));
  }, []);

  useEffect(() => {
    getUserPosts();
    dispatch(inEditMode(false));
  }, [isEditMode]);
  // console.log(userInfo + " from display user");

  //   const data_from_child = (data) => {
  //     console.log(data); // or set the data to a state
  //     // alert();
  //     getUserPosts();
  //   };

  // console.log(JSON.parse(userInfo)?.follows, " user info from Display User");
  // console.log(
  //   JSON.parse(userInfo).hasOwnProperty("follows"),
  //   " user info from Display User"
  // );
  return (
    <div className="profile-container">
      <Link className="back-home" to="/home">
        <ArrowBackIcon />
      </Link>
      <div className="profile-box">
        <div className="profile-card">
          <img
            className="user-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s"
          />
          <h1 className="user-name">{user?.displayName}</h1>
          <h3 className="user-username">
            @{user?.displayName?.split(" ").join("").slice(0, 4).toLowerCase()}
          </h3>
        </div>
        <div className="data">
          <div className="data-card">
            {posts.length} <span className="tweets-length">Tweets</span>
          </div>
          <div className="data-card">
            <span className="followers-length">Followers</span>
          </div>
          <div className="data-card">
            <span className="following-length">
              {userInfo?.follows?.length - 1}Following
            </span>
          </div>
          {/* <p>{userInfo?.PostsCount} </p>
          <p>{userInfo?.followerCount}</p> */}
        </div>
      </div>

      <div className="tweet-box">
        <TweetBox className="tweet-boxcontainer" />
      </div>

      <h3>My Posts</h3>
      {posts?.map((post) => {
        //   console.log(post.id);
        return (
          <div className="post-container">
            <div className="postt">
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
            </div>
            <div className="editdelete-container">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditBox(true);
                  setEditId(post.id);
                }}
              >
                Edit
              </button>
              <button
                className="delete-btnn"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
              {editBox && editId === post.id && (
                <EditPost
                  post={post}
                  setEditBox={setEditBox}
                  editId={post.id}
                />
              )}
              {/* <button onClick={() => setCommentBox(true)}>Comment</button>
                {commentBox && (
                  <CommentInput post={post} setCommentBox={setCommentBox} />
                )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default DisplayUser;
