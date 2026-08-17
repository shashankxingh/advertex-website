// auth.js - Handles logic for login.html (Phase 6)
import { 
  auth, 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged
} from './firebase-init.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- UI Logic ---
  let currentRole = 'user'; // default

  // Handle Role Selection Tabs
  const roleButtons = document.querySelectorAll('.role-btn');
  roleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class
      roleButtons.forEach(b => b.classList.remove('active'));
      // Add active class
      e.target.classList.add('active');
      // Update state
      currentRole = e.target.getAttribute('data-role');
      console.log("Selected role:", currentRole);
    });
  });

  // --- Firebase Auth Logic ---

  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user.email);
      // In a real app, you would redirect to a dashboard based on role
      // window.location.href = `dashboard-${currentRole}.html`;
    } else {
      console.log("User is signed out.");
    }
  });

  // Email/Password Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const btn = document.getElementById('login-btn');
      
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Signing In...';
      btn.disabled = true;

      // Note: We need to import signInWithEmailAndPassword in firebase-init.js if we strictly use passwords.
      // For this UI demo, we simulate the standard login success/fail or use email link.
      alert(`Simulating login for ${currentRole} with email ${email}\n(Firebase Auth requires signInWithEmailAndPassword to be added)`);
      
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  }

  // Google Login
  const googleBtn = document.getElementById('google-login-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        alert(`Successfully signed in as ${user.displayName} (${currentRole})`);
        // Redirect to dashboard...
      } catch (error) {
        console.error("Google sign in error:", error);
        alert(`Sign in failed: ${error.message}`);
      }
    });
  }
});
