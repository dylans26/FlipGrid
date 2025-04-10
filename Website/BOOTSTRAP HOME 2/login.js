import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
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

// Page switching
window.showPage = function (id) {
  ['homePage', 'loginPage', 'registerPage', 'successPage'].forEach(page =>
    document.getElementById(page).classList.add('hidden')
  );
  document.getElementById(id).classList.remove('hidden');
};

// Auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    showPage('successPage');
    listUploadedFiles();
  } else {
    showPage('homePage');
  }
});

// Forms
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    document.getElementById('loginError').textContent = "⚠️ " + err.message;
  }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    document.getElementById('registerError').textContent = "⚠️ " + err.message;
  }
});

// Google Sign-In
document.getElementById('googleSignIn').addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert("Google sign-in failed: " + err.message);
  }
});

// Navigation buttons
document.getElementById('goToLogin').addEventListener('click', () => showPage('loginPage'));
document.getElementById('goToRegister').addEventListener('click', () => showPage('registerPage'));
document.querySelectorAll('.goHome').forEach(btn => {
  btn.addEventListener('click', () => showPage('homePage'));
});
document.getElementById('logoutBtn').addEventListener('click', async () => {
  await signOut(auth);
  showPage('homePage');
});

// File Upload
document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const fileRef = ref(storage, 'uploads/' + file.name);
  try {
    await uploadBytes(fileRef, file);
    document.getElementById('uploadStatus').textContent = "✅ Upload complete!";
    listUploadedFiles();
  } catch (err) {
    document.getElementById('uploadStatus').textContent = "⚠️ " + err.message;
  }
});

async function listUploadedFiles() {
  const listRef = ref(storage, 'uploads/');
  const fileListDiv = document.getElementById('fileList');
  fileListDiv.innerHTML = '';
  try {
    const res = await listAll(listRef);
    for (const itemRef of res.items) {
      const url = await getDownloadURL(itemRef);
      const img = document.createElement('img');
      img.src = url;
      fileListDiv.appendChild(img);
    }
  } catch (err) {
    fileListDiv.innerHTML = "⚠️ Couldn't list files.";
  }
}