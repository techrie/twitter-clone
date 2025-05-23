import { useEffect, useState } from "react";
import db from "../utils/firebase";
import { useSelector } from "react-redux";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Follow = ({ userID }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [connectionDocID, setFollowingDocID] = useState("");

  const user = useSelector((store) => store.user);

  console.log(JSON.stringify(user) + "from Follow");

  const startFollowing = () => {
    if (!user) {
      alert("You need to sign in for that");
      return;
    }
    const { id } = firebase.firestore().collection("connections").add({
      followerID: user.uid,
      followeeID: userID,
    });
    setFollowingDocID(id);
    setIsFollowing(true);
  };

  const stopFollowing = () => {
    if (!user) {
      alert("You need to sign in for that");
      return;
    }
    firebase
      .firestore()
      .collection("connections")
      .doc(connectionDocID)
      .delete();
    setIsFollowing(false);
  };

  useEffect(() => {
    if (user) {
      async function checkFollowing() {
        const result = await firebase
          .firestore()
          .collection("connections")
          .where("followeeID", "==", userID)
          .where("followerID", "==", user.uid)
          .get();
        if (result.size === 1) {
          setIsFollowing(true);
          setFollowingDocID(result.docs[0].id);
        }
      }
      checkFollowing();
    }
  }, [user]);

  return (
    <div>
      <button
        className="lg:mr-0 lg:ml-auto bg-primary text-white px-2 py-4  lg:px-8 lg:py-4 rounded-md"
        type="submit"
        onClick={() => (isFollowing ? stopFollowing() : startFollowing())}
      >
        <span className="mx-2">
          <PersonAddIcon />
        </span>
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};
export default Follow;
