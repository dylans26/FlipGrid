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

document.addEventListener("DOMContentLoaded", () => {
  const signOutButton = document.getElementById('signOutButton');
  if (signOutButton) {
    signOutButton.addEventListener('click', () => {
      signOut(auth)
        .then(() => {
          alert('Signed out successfully!');
          window.location.href = "login.html"; // Optional redirect
        })
        .catch((error) => {
          console.error('Sign Out Error', error);
          alert('Sign out failed.');
        });
    });
  }
});



//ATTEMPT FROM CHAT FOR PORTFOLIO SECTION
// Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.getElementById('portfolio-grid');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active to clicked
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
      if (filterValue === 'all' || item.classList.contains(filterValue)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Adding New Classes
const form = document.getElementById('new-class-form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('class-title').value.trim();
  const teacher = document.getElementById('class-teacher').value.trim();
  const category = document.getElementById('class-category').value;

  if (!title || !teacher || !category) {
    alert('Please complete all fields.');
    return;
  }

  const newItem = document.createElement('div');
  newItem.classList.add('portfolio-item', category);

  newItem.innerHTML = `
    <img src="https://via.placeholder.com/300x200?text=${encodeURIComponent(title)}" alt="${title}">
    <h4>${title}</h4>
    <p>${teacher}</p>
  `;

  portfolioGrid.appendChild(newItem);

  form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const languageClass1 = document.getElementById("goToClass");

  languageClass1.addEventListener("click", () => {
    window.location.href = "portfolio-details.html";
  });
});


 