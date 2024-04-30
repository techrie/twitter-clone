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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { getAuth } from "firebase/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth();

  const user = useSelector((store) => store.user);

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
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
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

  return (
    <>
      <div className="sidebar">
        <XIcon className="twitterIcon-sidebar" />
        <div>
          <SidebarOptions active Icon={HomeIcon} text="Home" />
          <SidebarOptions Icon={SearchIcon} text="Explore" />
          <SidebarOptions Icon={MailOutlineIcon} text="Messages" />
          <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks" />
          <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications" />
          <SidebarOptions Icon={PersonOutlineIcon} text="Profile" />
          <SidebarOptions Icon={ExpandMoreIcon} text="More" />
        </div>

        <div className="user-details">
          <img className="user-img" src={user?.photoURL} alt="avatar_logo" />
          <h4>{user?.displayName}</h4>
          <button
            className="font-normal text-white cursor-pointer "
            onClick={handleSignOut}
          >
            <MoreHorizIcon />
          </button>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
