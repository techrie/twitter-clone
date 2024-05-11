import Home from "./Home";
import { getAuth } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

const Body = () => {
  const auth = getAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL, follows } = user;
        // dispatch(
        //   addUser({
        //     uid: uid,
        //     email: email,
        //     displayName: displayName,
        //     photoURL: photoURL,
        //     follows: follows,
        //   })
        // );
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
    <div>
      <Home />
    </div>
  );
};
export default Body;
