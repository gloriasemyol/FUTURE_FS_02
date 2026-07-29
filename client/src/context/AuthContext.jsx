import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return true;
    return payload.exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const validAtStart = isTokenValid(storedToken);

  if (!validAtStart) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  const [token, setToken] = useState(validAtStart ? storedToken : null);
  const [username, setUsername] = useState(
    validAtStart ? localStorage.getItem('username') : null
  );

  const login = (newToken, newUsername) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        login,
        logout,
        isAuthenticated: isTokenValid(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);