import Header from "./Header";
import { useState, useRef } from "react";
import { validateData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [message, setMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignUp = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = () => {
    // validate the form data first
    const msg = validateData(email.current.value, password.current.value);
    setMessage(msg);
    if (msg) return;

    if (!isSignIn) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const {uid, email, displayName} = auth.currentUser;
              dispatch(addUser({uid: uid, email: email, displayName: displayName}));
            })
            .catch((error) => {
              setMessage(error.message);
            });

          //console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + errorMessage);
        });
    }

    // console.log(email);
    // console.log(password);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen md:w-screen object-cover"
          src={BACKGROUND}
          alt="BG"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black md:w-[450px] mx-auto my-28 md:my-32 right-0 left-0 rounded-lg bg-opacity-90 "
      >
        <h1 className="font-bold text-4xl text-white font-sans mb-4 md:mb-7 -mt-6 md:mt-0">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-2 mx-auto w-full my-4 bg-gray-600 bg-opacity-50 text-white "
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email"
          className="p-2 mx-auto w-full my-4 bg-gray-600 bg-opacity-50 text-white "
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 mx-auto w-full my-4 bg-gray-600 bg-opacity-50 text-white "
        />
        <p className="text-red-700 mt-2 text-sm">{message}</p>
        <button
          onClick={handleSubmit}
          className="p-3 text-lg font-semibold mx-auto w-full mb-5 mt-7 text-white bg-red-700 rounded-lg hover:bg-red-600"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-white mt-5 ">
          {isSignIn ? "New to Netflix?" : "Already had an Account?"}{" "}
          <span
            onClick={handleSignUp}
            className="cursor-pointer text-white font-bold"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>
        <p className="text-xs text-white mt-10">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </form>
    </div>
  );
};

export default Login;
