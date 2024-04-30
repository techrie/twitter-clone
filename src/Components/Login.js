import { useRef, useState } from "react";
import "./Login.css";
import XIcon from "@mui/icons-material/X";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

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
        <p className="text-red-500 text-sm">{errorMessage}</p>
        <button type="submit" className="btn btn-block">
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
