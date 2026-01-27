const USERS_KEY = 'myapp_users';
const SESSION_KEY = 'myapp_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function register(data) {
  const { username, password, isUnder13, parentEmail } = data;

  if (!username || !password) {
    return { ok: false, message: 'All fields are required.' };
  }

  if (password.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters.' };
  }

  const users = getUsers();

  if (users.find(u => u.username === username)) {
    return { ok: false, message: 'Username already taken.' };
  }

  users.push({
    username,
    password,
    isUnder13,
    parentEmail: isUnder13 ? parentEmail : null,
    parentConsent: isUnder13 ? false : true,
    createdAt: Date.now()
  });

  saveUsers(users);
  setSession(username);

  return { ok: true };
}

function login(username, password) {
  const users = getUsers();
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return { ok: false, message: 'Invalid username or password.' };
  }

  setSession(username);
  return { ok: true };
}

function setSession(username) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ username, signedAt: Date.now() })
  );
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}
