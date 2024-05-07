import { useEffect, useState } from "react";
import "./widgetsComp.css";
import SearchIcon from "@mui/icons-material/Search";
import User from "./User";
import db from "../utils/firebase";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { fetchUser } from "./FetchUser";
import { addUserFollowees } from "../utils/postsSlice";

const Widgets = () => {
  // debugger;
  const [users, setNewUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userDet, setUserDet] = useState({});

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log(user?.uid + "  from widgets.....");

  const fetchUserDetails = async () => {
    const userInf = await fetchUser(user?.uid);
    // console.log(userInf + "  from FetchUserDet");
    console.log(
      JSON.stringify(userInf?.follows) +
        " from fetchUser in Widgets for follows"
    );
    setUserDet(JSON.stringify(userInf));
  };

  const handleFollowUsers = (userId) => {
    console.log(user?.uid + " checking user uid from widgets");
    // db.collection("users")
    //   .doc(otherUserId)
    //   .update({
    //     followerCount: firebase.firestore.FieldValue.increment(1),
    //   });
    console.log(userId + "  other User id");
    console.log(firebase.firestore);
    // console.log(JSON.stringify(db.collection("users")) + "  users collection");
    db.collection("users")
      .doc(user?.uid)
      .update({
        follows: firebase?.firestore?.FieldValue?.arrayUnion(userId),
      });
    // // dispatch(
    // //   addUserFollowees({
    // //     followees: userInf?.follows,
    // //   })
    // );
    fetchUserDetails();
  };

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setNewUsers(snapshot?.docs.map((doc) => doc.data()));
    });
    db.collection("users").onSnapshot((snapshot) =>
      setFilteredUsers(snapshot?.docs.map((doc) => doc.data()))
    );
    // getOtherUsers();
    fetchUserDetails();
    // handleFollowUsers();
  }, []);

  useEffect(() => {
    getOtherUsers();
  }, [users]);

  const getOtherUsers = () => {
    let otherUserss =
      users && users.length !== 0
        ? users.filter((person) => person?.email !== user?.email)
        : [];
    // console.log(JSON.stringify(otherUsers) + " otherUsers");
    setOtherUsers(otherUserss);
  };

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
              getOtherUsers();
            }}
          >
            <SearchIcon />
          </button>
        </div>
        {filteredUsers?.length === 0 ? (
          <div className="Nouserwidgets">
            <h3>No user found</h3>
          </div>
        ) : (
          <div className="widgetsContainer">
            {filteredUsers?.map((user) => (
              <User key={nanoid()} displayName={user.displayName} />
            ))}
          </div>
        )}
      </div>
      {/* <div className="users-follow">
        <h3>Who to follow</h3>
        {otherUsers &&
          otherUsers.length !== 0 &&
          otherUsers.map((user) => {
            console.log(JSON.stringify(user) + "  inside Other Users Map");
            return (
              <div key={nanoid()} className="user-info-follow">
                <User key={nanoid()} displayName={user.displayName} />
                <button
                  className="follow-btn"
                  onClick={() => handleFollowUsers(user.userId)}
                >
                  Follow
                </button>
              </div>
            );
          })}
      </div>
       */}
      <div className="users-follow">
        <h3>Who to follow</h3>
        {otherUsers?.length === 0 ? (
          <div>
            <h4>No users to follow</h4>
          </div>
        ) : (
          otherUsers?.map((user) => {
            console.log(JSON.stringify(user) + "  inside Other Users Map");
            return (
              <div key={nanoid()} className="user-info-follow">
                <User key={nanoid()} displayName={user.displayName} />
                <button
                  className="follow-btn"
                  onClick={() => handleFollowUsers(user.userId)}
                >
                  Follow
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Widgets;
