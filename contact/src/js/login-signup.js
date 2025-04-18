const popup = document.getElementById('loginPopup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

function togglePopup() {
  popup.classList.toggle('hidden');
  showLogin(); // always start with login
}

function showSignup() {
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
}

function showLogin() {
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
}

// Activate popup on "SIGN IN" click
document.querySelector('.user').addEventListener('click', function(e) {
  e.preventDefault();
  togglePopup();
});