
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getStorage, ref, uploadBytes, listAll, getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js";
// import { signOut } from "firebase/auth";

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

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Get the sign-out button
  const signOutButton = document.getElementById("signOutButton");

  // Add a click event listener
  signOutButton.addEventListener("click", () => {
    // Example sign-out logic
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
    // Sign out the user
    signOut(auth)

signOutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

    // Clear user session (example: localStorage/sessionStorage)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    window.location.href = "login.html";
  });
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

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();