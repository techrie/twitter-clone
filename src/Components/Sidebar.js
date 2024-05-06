import "./Sidebar.css";
import XIcon from "@mui/icons-material/X";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth();
  console.log(auth);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL, follows } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            follows: follows,
          })
        );

        navigate("/home");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const user = useSelector((store) => store.user);
  console.log(JSON.stringify(user) + "from sidebar....");

  return (
    <>
      <div className="sidebar">
        <XIcon className="twitterIcon-sidebar" />
        <div className="sidebar-menu">
          <SidebarOptions active Icon={HomeIcon} text="Home" />
          <SidebarOptions Icon={SearchIcon} text="Explore" />
          <SidebarOptions Icon={MailOutlineIcon} text="Messages" />
          <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks" />
          <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications" />
          <Link className="profile-link" to="/profile">
            <SidebarOptions
              Icon={PersonOutlineIcon}
              text="Profile"
              user={user}
            />
          </Link>
          <SidebarOptions Icon={ExpandMoreIcon} text="More" />
        </div>
        {/* user.email.split('@')[0] */}
        <div className="user-details">
          <img className="user-img" src={user?.photoURL} alt="avatar_logo" />
          <div className="user-name">
            <h4>{user?.displayName}</h4>
            <h5>
              @
              {user?.displayName?.split(" ").join("").slice(0, 4).toLowerCase()}
            </h5>
          </div>
          <LogoutIcon className="btn" onClick={handleSignOut} />

          {/* <button className="btn" onClick={handleSignOut}>
            signout
          </button> */}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
