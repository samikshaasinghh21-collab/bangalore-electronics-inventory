import React, { createContext, useContext, useState } from "react";
 
export const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
  const login = async (email, password) => {
    // TEMP login logic (replace with API)
    if (email === "admin@be.com" && password === "admin123") {
      setUser({ email, role: "admin" });
    } else if (email === "user@be.com" && password === "user123") {
      setUser({ email, role: "user" });
    } else {
      throw new Error("Invalid credentials");
    }
  };
 
  const logout = () => {
    setUser(null);
  };
 
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 
// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
 
 