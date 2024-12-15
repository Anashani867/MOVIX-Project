import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser); // Set the current user from localStorage
      axios.defaults.headers["Authorization"] = `Bearer ${storedToken}`; // Set token in axios headers
    }
  }, []);

  // Save user data (including avatar) to localStorage
  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData)); // Save the full user data (including avatar)
    localStorage.setItem("token", userData.token); // Assuming the token is part of the user data
    axios.defaults.headers["Authorization"] = `Bearer ${userData.token}`;
  };

  // Login function that sets the current user and saves to localStorage
  const login = (userData) => {
    setCurrentUser(userData); // Set user in state
    saveUserToLocalStorage(userData); // Save to localStorage
  };

  // Logout function that clears localStorage and resets the context state
  const logout = () => {
    setCurrentUser(null); // Clear the user state
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    delete axios.defaults.headers["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
