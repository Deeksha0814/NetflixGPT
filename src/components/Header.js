import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { AVATAR, LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { addGptMovieResult, toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user);
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts...
    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());

    // While returning from the searchGPT page, I am clearing my searched results (as they are stored in redux store, so if i again go to searchGPT page it will show my previous results. So to see the blank page there i am dispatching an action of clearing my previous stored movies details)
    dispatch(addGptMovieResult({ movieNames: null, movieResults: null }));
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute md:pl-12 w-full bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-48 mx-auto md:mx-0" src={LOGO} alt="Logo" />
      <div className="md:mt-6 mx-auto md:mx-0">
        {user && (
          <div className="flex justify-between md:mr-10">
            {showGptSearch && (
              <select
                className="w-28 ml-4 h-8 my-auto md:mr-2 font-bold bg-gray-950 text-white rounded-lg cursor-pointer text-center"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option
                    key={lang.identifier}
                    value={lang.identifier}
                    className="bg-gray-900 h-6 text-green-700 font-bold"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleGptSearch}
              className="w-24 h-10 my-auto mx-4 font-bold text-white bg-cyan-950 cursor-pointer hover:scale-105"
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>
            <img
              src={AVATAR}
              className="hidden md:block w-14 h-14 my-auto mx-4 cursor-pointer"
              alt="icon"
            />
            <button
              onClick={handleSignOut}
              className="px-3 py-2 my-auto mx-4 font-bold bg-red-600 text-white hover:bg-red-500 hover:scale-105 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
