import { Link } from "react-router-dom";
import "./ProfilePage.css";
import TweetBox from "./TweetBox";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Avatar } from "@mui/material";

import { useState, useEffect } from "react";

import { fetchUser, fetchUserPosts, deletePost, editPost } from "./FetchUser";

import EditPost from "./EditPost";

import { inEditMode } from "../utils/postsSlice";
import db from "../utils/firebase";

import { bioChanged } from "../utils/userSlice";

const ProfilePagee = () => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);

  const [editBox, setEditBox] = useState(false);
  const [editId, setEditId] = useState("");

  //open the dropdown
  const [open, setOpen] = useState(false);
  const [dropdownId, setDropdownId] = useState("");

  //bio
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState({
    designation: "SW Engineer",
    manager: "Lao Ding",
    tenure: "10 years",
  });

  const dispatch = useDispatch();

  const isEditMode = useSelector((store) => store.post);

  const isBioChanged = useSelector((store) => store.user.isBioChanged);

  const user = useSelector((store) => store.user);
  // console.log(JSON.stringify(user) + "from DisplayUserPage.....");
  const refreshPost = useSelector((store) => store.post.refreshPost);

  const getUserPosts = async () => {
    const allPosts = await fetchUserPosts(user?.uid);
    // console.log(allPosts + "  from getUserPosts");
    setPosts(Array.from(allPosts));
    // setOldPosts(Array.from(allPosts));
    // console.log(JSON.stringify(allPosts) + "fetching all Posts for a user");
  };

  const handleChangeBio = (e) => {
    const { name, value } = e.target;
    setBio({ ...bio, [name]: value });
  };

  const handleSubmitBio = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user?.uid)
      .update({
        "bio.designation": bio.designation,
        "bio.manager": bio.manager,
        "bio.tenure": bio.tenure,
      })
      .then(() => {
        setBio({
          designation: "",
          manager: "",
          tenure: "",
        });
        console.log("Document Bio successfully updated!");
      });
    dispatch(bioChanged(true));

    // setBio({ ...bio, [e.target.name]: "" }); set input to empty
  };

  const handleOpen = (postId) => {
    setDropdownId(postId);
    setOpen(!open);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
    setOpen(false);
    getUserPosts();
  };

  const fetchUserDetails = async () => {
    const userInf = await fetchUser(user?.uid);
    // console.log(userInf + "  from FetchUserDet");
    // console.log(JSON.stringify(userInf) + "from fetchUser");
    setUserInfo(userInf);
  };

  //fetch user details whenever bio changes
  useEffect(() => {
    fetchUserDetails();
  }, [userInfo, isBioChanged]);

  useEffect(() => {
    fetchUserDetails();
    getUserPosts();
    dispatch(inEditMode(false));
  }, []);

  useEffect(() => {
    getUserPosts();
    dispatch(inEditMode(false));
  }, [isEditMode]);

  //get all posts whenever posts change
  useEffect(() => {
    console.log(posts, "posts");
    getUserPosts();
  }, [refreshPost]);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  // console.log(userInfo + " from display user");

  //   const data_from_child = (data) => {
  //     console.log(data); // or set the data to a state
  //     // alert();
  //     getUserPosts();
  //   };

  // console.log(userInfo, " user info from Profile Pagee ");

  return (
    <div className="profile-containerr">
      <Link className="back-home" to="/home">
        <ArrowBackIcon />
      </Link>
      <div className="profile-box-bio">
        <div className="profile-boxr">
          <div className="profile-cardr">
            <img
              className="user-imgr"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s"
            />
            <h1 className="user-namer">{user?.displayName}</h1>
            <h3 className="user-usernamer">
              @
              {user?.displayName?.split(" ").join("").slice(0, 4).toLowerCase()}
            </h3>
          </div>
          <div className="datar">
            <div className="data-cardr">
              {posts?.length} <span className="tweets-length">Tweets</span>
            </div>
            <div className="data-cardr">
              {userInfo?.followerCount}
              <span className="followers-length"> Followers</span>
            </div>
            <div className="data-cardr">
              {userInfo?.follows?.length - 1}
              <span className="following-length"> Following</span>
            </div>
            {/* <p>{userInfo?.PostsCount} </p>
          <p>{userInfo?.followerCount}</p> */}
          </div>
        </div>
        <div className="profile-bior">
          <div className="bio-container">
            <p>
              Designation
              <span className="bio-color">{userInfo?.bio?.designation}</span>
            </p>
            <p>
              Manager
              <span className="bio-color">{userInfo?.bio?.manager}</span>
            </p>
            <p>
              Tenure <span className="bio-color">{userInfo?.bio?.tenure}</span>
            </p>
            <button
              className="editBio-btn"
              onClick={() => setEditBio(!editBio)}
            >
              Edit Bio
            </button>
          </div>
          {editBio ? (
            <div>
              <form className="formr">
                <div className="form-rowr">
                  <label htmlFor="designation" className="form-labelr">
                    Designation
                  </label>
                  <input
                    type="text"
                    className="form-inputr"
                    id="designation"
                    name="designation"
                    value={bio.designation}
                    onChange={handleChangeBio}
                    placeholder="Add designation"
                  />
                </div>
                <div className="form-rowr">
                  <label htmlFor="manager" className="form-labelr">
                    Manager
                  </label>
                  <input
                    type="text"
                    className="form-inputr"
                    id="manager"
                    name="manager"
                    value={bio.manager}
                    onChange={handleChangeBio}
                    placeholder="Add manager"
                  />
                </div>
                <div className="form-rowr">
                  <label htmlFor="tenure" className="form-labelr">
                    Tenure
                  </label>
                  <input
                    type="text"
                    className="form-inputr"
                    id="tenure"
                    name="tenure"
                    value={bio.tenure}
                    onChange={handleChangeBio}
                    placeholder="Add tenure"
                  />
                </div>
                <button
                  className="updateBio-btn"
                  type="submit"
                  onClick={handleSubmitBio}
                >
                  Update Bio
                </button>
                {/* <button onClick={() => setBio({})}>Clear Inputs</button> */}
              </form>
            </div>
          ) : null}
        </div>
      </div>

      <div className="tweetbox-posts">
        <div className="tweet-boxr">
          <TweetBox className="tweet-boxcontainerr" />
        </div>

        <div className="all-posts">
          <h3>My Posts</h3>
          {posts?.map(
            ({
              displayName,
              username,
              verified,
              text,
              image,
              avatar,
              createdAt,
              comments,
              id,
            }) => {
              return (
                <div className="single-post">
                  <div className="post-avatarr">
                    <Avatar src={avatar} />
                  </div>

                  <div className="post-bodyr">
                    <div className="postHeaderr">
                      <div className="postHeaderTextr">
                        <h4>
                          {displayName}
                          <span className="postHeaderUserNamer">
                            {verified && (
                              <VerifiedUserIcon className="post-badger" />
                            )}
                            @{username}
                          </span>
                        </h4>

                        <p>
                          {new Date(
                            createdAt?.seconds * 1000 +
                              createdAt?.nanoseconds / 1000000
                          ).toLocaleDateString("en-US")}
                          <span className="timer">
                            {new Date(
                              createdAt?.seconds * 1000 +
                                createdAt?.nanoseconds / 1000000
                            ).toLocaleTimeString()}
                          </span>
                        </p>
                      </div>

                      <div className="postHeaderDescriptionr">
                        <p>{text}</p>
                      </div>
                    </div>
                    <img
                      // src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHhqdWp4cXVtaWh5N29uMTVwdDN1bW5pcTdlczg2dmhmaTM1MTBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JQYJwMKXRmb1viBSBJ/giphy.gif"
                      src={image}
                    />
                    <div className="postFooterr">
                      <RepeatIcon />
                      <FavoriteBorderIcon />
                    </div>
                  </div>

                  <div className="editdelete-container">
                    <div className="dropdown">
                      <button
                        className="dropdown-btn"
                        onClick={() => handleOpen(id)}
                      >
                        Actions
                      </button>
                      {dropdownId === id && open ? (
                        <ul className="menu">
                          <li className="menu-item">
                            <button
                              className="edit-btn"
                              onClick={() => {
                                setEditBox(!editBox);
                                setEditId(id);
                                setOpen(false);
                              }}
                            >
                              Edit
                            </button>
                          </li>
                          <li className="menu-item">
                            <button
                              className="delete-btnn"
                              onClick={() => handleDeletePost(id)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      ) : null}
                    </div>

                    {editBox && editId === id && (
                      <EditPost
                        post={{
                          displayName,
                          username,
                          verified,
                          text,
                          image,
                          avatar,
                          createdAt,
                          comments,
                          id,
                        }}
                        setEditBox={setEditBox}
                        editId={id}
                      />
                    )}
                    {/* <button onClick={() => setCommentBox(true)}>Comment</button>
                {commentBox && (
                  <CommentInput post={post} setCommentBox={setCommentBox} />
                )} */}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePagee;
