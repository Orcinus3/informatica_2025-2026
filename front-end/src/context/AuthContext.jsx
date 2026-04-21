import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (userData) => setUser(userData);
  const loginUserId = (userId) => setUserId(userId);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ userId, user, isLogged: !!user, login, logout, loginUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
