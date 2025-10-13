// ===== USER LOGIN / SIGNUP SYSTEM =====

// Global variable to track current user
let currentUser = localStorage.getItem('currentUser') || null;

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const toggleBtn = document.getElementById('toggle-btn');
const message = document.getElementById('message');
const formTitle = document.getElementById('form-title');

let isSignup = false;

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    isSignup = !isSignup;
    formTitle.textContent = isSignup ? 'Create Account' : 'Login';
    loginBtn.textContent = isSignup ? 'Sign Up' : 'Login';
    toggleBtn.textContent = isSignup ? 'Already have an account?' : 'Create Account';
    message.textContent = '';
  });

  loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      message.textContent = 'Please fill out all fields.';
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '{}');

    if (isSignup) {
      if (users[username]) {
        message.textContent = 'Username already exists!';
      } else {
        users[username] = { password, todos: [], notes: [] };
        localStorage.setItem('users', JSON.stringify(users));
        message.textContent = 'Account created! You can now log in.';
        isSignup = false;
        formTitle.textContent = 'Log In';
        loginBtn.textContent = 'Log In';
        toggleBtn.textContent = 'Create Account';
      }
    } else {
      if (!users[username] || users[username].password !== password) {
        message.textContent = 'Invalid username or password.';
      } else {
        localStorage.setItem('currentUser', username);
        window.location.href = 'index.html';
      }
    }
  });
}
