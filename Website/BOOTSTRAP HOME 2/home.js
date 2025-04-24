import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getStorage, ref, uploadBytes, listAll, getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDb4Zv5J2V-uPQuDqzAyWstnM6PDfKX3cI",
  authDomain: "test-fire-449ff.firebaseapp.com",
  projectId: "test-fire-449ff",
  storageBucket: "test-fire-449ff.appspot.com",
  messagingSenderId: "574355526661",
  appId: "1:574355526661:web:928eaa40a2cf4466aff86c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

const signOutButton = document.getElementById('signOutButton');

signOutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert('Signed out successfully!');
    })
    .catch((error) => {
      // An error happened.
      console.error('Sign Out Error', error);
      alert('Sign out failed.');
    });
});