import React, { useRef, useState } from "react";
import checkValidateData from "../utils/validateData";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import useStateChange from "../utils/useAuthStateChange";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);

  useStateChange();

  const handleSignInToggle = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleLoginButton = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    //  console.log(email);
    //  console.log(password);
    setErrorMessage(message);

    if (message) return;

    if (!isSignedIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // console.log(user);
          const {uid, email } = user;
          dispatch(addUser({ uid: uid, email:email }));
          navigate("/Dashboard")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode +" " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          const {uid, email } = user;
          dispatch(addUser({ uid: uid, email:email }));
          navigate("/Dashboard")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode +" " + errorMessage);
        });
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className=" text-black font-semibold text-2xl mb-6">
          {" "}
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>
        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="password"
          ref={password}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <p className="text-red-500 mb-2 font-semibold">{errorMessage}</p>
        <button
          className="mb-4 w-full bg-blue-500 py-2 text-white rounded hover:bg-blue-600"
          onClick={handleLoginButton}
        >
          {isSignedIn ? "Sign in" : "Sign up"}
        </button>
        <p>
          {isSignedIn ? "New user? " : "Already user? "}
          <span
            className="text-blue-600 cursor-pointer hover:text-blue-800"
            onClick={handleSignInToggle}
          >
            {isSignedIn ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
