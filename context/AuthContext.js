"use client"

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the login-success cookie to determine authentication status
    const loginSuccess = document.cookie
      .split("; ")
      .find(row => row.startsWith("login-success="))
      ?.split("=")[1];

    if (loginSuccess === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
