/* Minimal demo auth layer (client-side only).
   - Stores users and session in localStorage
   - NOT suitable for production.
   - Intended for templates, prototypes and offline demos.
*/

const USERS_KEY = 'demo_users_v1';
const SESSION_KEY = 'demo_session_v1';

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed reading users', e);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Registers a new user. Returns { ok: boolean, message: string }
function register(email, password) {
  email = (email || '').toLowerCase();
  if (!email || !password) return { ok: false, message: 'Email and password required' };
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { ok: false, message: 'User already exists' };
  }
  users.push({ email, password, createdAt: Date.now() });
  saveUsers(users);
  // create a session immediately after sign up
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, signedAt: Date.now() }));
  return { ok: true, message: 'Created' };
}

// Attempts login. Returns { ok: boolean, message: string }
function login(email, password) {
  email = (email || '').toLowerCase();
  const users = getUsers();
  const u = users.find(x => x.email === email);
  if (!u) return { ok: false, message: 'No account found for that email' };
  if (u.password !== password) return { ok: false, message: 'Incorrect password' };
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email, signedAt: Date.now() }));
  return { ok: true, message: 'Signed in' };
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function clearDemoData() {
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(SESSION_KEY);
}

// Expose helpers to the global scope for inline scripts (convenience)
window.register = register;
window.login = login;
window.logout = logout;
window.getSession = getSession;
window.getUsers = getUsers;
window.saveUsers = saveUsers;
window.clearDemoData = clearDemoData;
