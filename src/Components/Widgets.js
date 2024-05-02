import { useEffect, useState } from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import User from "./User";
import db from "../utils/firebase";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import DisplayUser from "./DisplayUser";

const Widgets = () => {
  const [users, setNewUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((store) => store.user);
  console.log(user.uid + "from widgets.....");

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setNewUsers(snapshot?.docs.map((doc) => doc.data()))
    );
    db.collection("users").onSnapshot((snapshot) =>
      setFilteredUsers(snapshot?.docs.map((doc) => doc.data()))
    );
  }, []);

  const otherUsers = users.filter((person) => person.email !== user.email);
  // console.log(JSON.stringify(otherUsers) + "otherUsers");

  return (
    <div className="widgets">
      <div className="widgets-half">
        <div className="widgets-search">
          <input
            type="text"
            className="search"
            placeholder="Search By Name"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="widgetsSearchIcon"
            onClick={() => {
              console.log(searchText);
              const filteredUsers = users.filter((user) =>
                user.displayName
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              console.log(users);

              // error handling
              setFilteredUsers(filteredUsers);
            }}
          >
            <SearchIcon />
          </button>
        </div>

        <div className="widgetsContainer">
          {filteredUsers.map((user) => (
            <User key={nanoid()} displayName={user.displayName} />
          ))}
        </div>
      </div>
      <div className="users-follow">
        {otherUsers.map((user) => {
          return (
            <div key={nanoid()} className="user-info-follow">
              <User key={nanoid()} displayName={user.displayName} />
              <button className="follow-btn">Follow</button>
            </div>
          );
        })}
      </div>
      <DisplayUser />
    </div>
  );
};
export default Widgets;
