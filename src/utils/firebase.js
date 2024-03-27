// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0jhqk78SimsCGBvGw6-PpW2Ny7GUoRPg",
  authDomain: "netflixgpt-aa06f.firebaseapp.com",
  projectId: "netflixgpt-aa06f",
  storageBucket: "netflixgpt-aa06f.appspot.com",
  messagingSenderId: "495301193274",
  appId: "1:495301193274:web:31a050fbc57206b92ecf03",
  measurementId: "G-H6RJ63EXV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();