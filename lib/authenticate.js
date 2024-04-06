const getToken = () => localStorage.getItem('token');

const setToken = (token) => localStorage.setItem('token', token);

const removeToken = () => localStorage.removeItem('token');

const readToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(payload);
  } catch (error) {
    console.error("Error reading token", error);
    return null;
  }
};

const isAuthenticated = () => !!getToken();

const authenticateUser = async (username, password) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error('Authentication failed');

  const { token } = await response.json();
  setToken(token);
};

const registerUser = async (username, password, password2) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, password2 }),
  });

  if (!response.ok) throw new Error('Registration failed');
  return true;
};

export { getToken, setToken, removeToken, isAuthenticated, authenticateUser, registerUser };
