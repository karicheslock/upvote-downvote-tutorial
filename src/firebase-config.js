import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApdBWayMV-gvNefQGPPGO3JZKb-3bcHW8",
    authDomain: "upvote-downvote-tutorial.firebaseapp.com",
    projectId: "upvote-downvote-tutorial",
    storageBucket: "upvote-downvote-tutorial.appspot.com",
    messagingSenderId: "908504920914",
    appId: "1:908504920914:web:c5a971ca626ca54ae3808b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  });
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();