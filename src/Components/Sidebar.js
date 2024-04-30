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

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <XIcon className="twitterIcon-sidebar" />
        <SidebarOptions active Icon={HomeIcon} text="Home" />
        <SidebarOptions Icon={SearchIcon} text="Explore" />
        <SidebarOptions Icon={MailOutlineIcon} text="Messages" />
        <SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks" />
        <SidebarOptions Icon={NotificationsNoneIcon} text="Notifications" />
        <SidebarOptions Icon={PersonOutlineIcon} text="Profile" />
        <SidebarOptions Icon={ExpandMoreIcon} text="More" />
      </div>
    </>
  );
};
export default Sidebar;
