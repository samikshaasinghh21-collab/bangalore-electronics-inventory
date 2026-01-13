import React, { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);

    // TEMP LOGIN (replace with API)
    if (email === "admin@be.com" && password === "admin123") {
      setUser({ email });
      setLoading(false);
    } else {
      setLoading(false);
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
