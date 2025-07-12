"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

interface EmployerAuthContextType {
  isEmployerLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const EmployerAuthContext = createContext<EmployerAuthContextType | undefined>(undefined);

export const EmployerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read localStorage synchronously on first render (client-side only)
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("employer_logged_in") === "true";
  });

  // Keep state in sync if localStorage changes in another tab
  useEffect(() => {
    const handleStorage = () => {
      setIsEmployerLoggedIn(localStorage.getItem("employer_logged_in") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = () => {
    localStorage.setItem("employer_logged_in", "true");
    setIsEmployerLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("employer_logged_in");
    setIsEmployerLoggedIn(false);
  };

  return (
    <EmployerAuthContext.Provider value={{ isEmployerLoggedIn, login, logout }}>
      {children}
    </EmployerAuthContext.Provider>
  );
};

export const useEmployerAuth = () => {
  const ctx = useContext(EmployerAuthContext);
  if (!ctx) throw new Error("useEmployerAuth must be used within EmployerAuthProvider");
  return ctx;
}; 