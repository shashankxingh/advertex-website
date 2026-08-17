// firebase-init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX35Z7wxknzl0T34pUINkn8NpaxM1PHms",
  authDomain: "advertex-studio.firebaseapp.com",
  projectId: "advertex-studio",
  storageBucket: "advertex-studio.firebasestorage.app",
  messagingSenderId: "1082281623593",
  appId: "1:1082281623593:web:ba7629b741a15097cb1c38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export for use in other files
export { 
  auth, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
};
