// ===============================
// SIMPLE AUTH SYSTEM (BEGINNER)
// ===============================

const USERS_KEY = 'myapp_users';
const SESSION_KEY = 'myapp_session';

// Get users from browser storage
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

// Save users to browser storage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Create a new account
function register(email, password) {
  if (!email || !password) {
    return { ok: false, message: 'Please fill in all fields.' };
  }

  if (password.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters.' };
  }

  const users = getUsers();

  if (users.find(user => user.email === email)) {
    return { ok: false, message: 'User already exists.' };
  }

  users.push({ email, password });
  saveUsers(users);
  setSession(email);

  return { ok: true };
}

// Log in
function login(email, password) {
  const users = getUsers();

  const user = users.find(
    user => user.email === email && user.password === password
  );

  if (!user) {
    return { ok: false, message: 'Invalid email or password.' };
  }

  setSession(email);
  return { ok: true };
}

// Save session
function setSession(email) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      email,
      signedAt: Date.now()
    })
  );
}

// Get current session
function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

// Log out
function logout() {
  localStorage.removeItem(SESSION_KEY);
}
