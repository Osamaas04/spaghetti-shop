<<<<<<< HEAD
"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check the login-success cookie to determine authentication status
    const loginSuccess = document.cookie
      .split("; ")
      .find(row => row.startsWith("login-success="))
      ?.split("=")[1];

    if (loginSuccess === "true") {
      setIsAuthenticated(true);

      // Fetch user data if authenticated
      const fetchUser = async () => {
        try {
          const response = await fetch("/api/user"); // Update this URL to your user API
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };

      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
=======
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
>>>>>>> 1cc6beb4f824f2e8e3a5cbd9653aebf64115ba64
