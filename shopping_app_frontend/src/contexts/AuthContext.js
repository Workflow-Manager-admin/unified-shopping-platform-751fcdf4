import React, { createContext, useState, useEffect } from "react";
import { AuthAPI } from "../api";

// PUBLIC_INTERFACE
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Contains {username, ...}
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    // On mount, validate token and fetch user info
    const autoLogin = async () => {
      if (token) {
        try {
          const me = await AuthAPI.me(token);
          setUser(me);
        } catch {
          logout(); // Token invalid
        }
      }
    };
    autoLogin();
    // eslint-disable-next-line
  }, [token]);

  // PUBLIC_INTERFACE
  const login = async (username, password) => {
    const data = await AuthAPI.login(username, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser({ username });
    return data;
  };

  // PUBLIC_INTERFACE
  const register = async (username, password) => {
    await AuthAPI.register(username, password);
    // Optionally, auto-login
    return login(username, password);
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
