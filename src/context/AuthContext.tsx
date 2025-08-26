// src/context/AuthContext.tsx
import  { createContext, useState,  type ReactNode } from "react";
import { login as loginService, logout as logoutService } from "../services/authService";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loginUser: async () => {},
  logoutUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// ✅ Corrected typing and explicit JSX return
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginUser = async (email: string, password: string) => {
    try {
      const { token, user } = await loginService(email, password);
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    logoutService();
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
