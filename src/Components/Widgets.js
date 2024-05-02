import { useEffect, useState } from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import User from "./User";
import db from "../utils/firebase";

const Widgets = () => {
  const [users, setNewUsers] = useState([]);

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setNewUsers(snapshot?.docs.map((doc) => doc.data()))
    );
  }, []);

  return (
    <div className="widgets">
      <div className="widgets-search">
        <SearchIcon className="widgetsSearchIcon" />
        <input type="text" className="search" placeholder="Search" />
      </div>

      <div className="widgetsContainer">
        {users.map((user) => (
          <User key={user.email} displayName={user.displayName} />
        ))}
      </div>
    </div>
  );
};
export default Widgets;
