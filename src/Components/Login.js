import "./Login.css";
import { useRef, useState } from "react";
import XIcon from "@mui/icons-material/X";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import db from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const auth = getAuth();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);

  const handleButtonClick = () => {
    //Validate the email and password

    const message = checkValidData(email.current.value, password.current.value);
    // console.log(message);

    setErrorMessage(message);

    if (message) return;

    if (!isSignIn) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL, follows } =
                auth.currentUser;

              db.collection("users")
                .doc(uid)
                .set({
                  username: displayName
                    ?.split(" ")
                    .join("")
                    .slice(0, 4)
                    .toLowerCase(),
                  email: email,
                  displayName: displayName,
                  follows: [uid],
                  userId: uid,
                  followerCount: 0,
                  bio: { designation: "", manager: "", tenure: "" },
                })
                .then(() => {
                  console.log(
                    `Document successfully written! for user - ${displayName}`
                  );
                })
                .catch((error) => {
                  console.error(
                    `Error writing document for user - ${displayName}`,
                    error
                  );
                });

              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                  follows: follows,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "---" + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "---" + errorMessage);
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL, follows } = user;
        // console.log(JSON.stringify(user) + " .. from user login");
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

  // useEffect(() => {
  //   if (auth.currentUser) {
  //     let uid = auth.currentUser.uid;

  //     db.collection("users")
  //       .doc(uid)
  //       .onSnapshot((snapshot) => {
  //         // setFname(snapshot.fname);
  //         // setLname(snapshot.lname);
  //       });
  //   } else {
  //   }
  // }, [auth]);

  return (
    <div className="login">
      <form className="form-login" onSubmit={(e) => e.preventDefault()}>
        <XIcon className="twitterIcon-sidebar" />
        <h1>Sign In</h1>
        {!isSignIn && (
          <input
            type="text"
            ref={name}
            placeholder="Name"
            className="form-input"
          />
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="form-input"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="form-input"
        />
        {/* Fix this error message text to red */}
        <p className="text-red-500 text-sm">{errorMessage}</p>
        <button
          type="submit"
          className="btn btn-block"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignIn}>
          {isSignIn
            ? "New to Twitter? Sign Up Now"
            : "Already have an account. Sign In Now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
