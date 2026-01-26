const USERS_KEY = 'myapp_users';
const SESSION_KEY = 'myapp_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function register(email, password) {
  const users = getUsers();

  if (users.find(u => u.email === email)) {
    return { ok: false, message: 'User already exists' };
  }

  users.push({ email, password });
  saveUsers(users);
  setSession(email);

  return { ok: true };
}

function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { ok: false, message: 'Invalid email or password' };
  }

  setSession(email);
  return { ok: true };
}

function setSession(email) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, signedAt: Date.now() })
  );
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}
