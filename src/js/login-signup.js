const popup = document.getElementById('loginPopup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

function togglePopup() {
  popup.classList.toggle('hidden');
  showLogin(); 
}

function showSignup() {
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
}

function showLogin() {
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
}

document.querySelector('.username').addEventListener('click', function(e) {
  e.preventDefault();
  togglePopup();
});