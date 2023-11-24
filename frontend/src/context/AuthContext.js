import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user data
      const decodedToken = jwtDecode(token);
      // Ensure the token is still valid
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
      }
      return decodedToken;
    }
    return null;
  });

  useEffect(() => {
    // Optional: Set up a token expiration check
    const token = localStorage.getItem("token");
    let logoutTimer;
    if (token) {
      const decodedToken = jwtDecode(token);
      const remainingTime = decodedToken.exp * 1000 - Date.now();
      logoutTimer = setTimeout(() => {
        setUser(null);
        localStorage.removeItem("token");
      }, remainingTime);
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, [user]);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    setUser({
      ...userData.user,
      username: userData.username,
      role: userData.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
