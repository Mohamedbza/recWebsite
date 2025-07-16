"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'candidate' | 'employer';
  location?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, userType: 'candidate' | 'employer') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("auth_user");
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
      }
    }
  }, []);

  const login = async (email: string, password: string, userType: 'candidate' | 'employer') => {
    setLoading(true);
    
    try {
      const endpoint = userType === 'candidate' 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/candidates/login`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/companies/login`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Extract user data based on user type
      const userData: User = {
        id: userType === 'candidate' ? data.candidate._id : data.company._id,
        email: userType === 'candidate' ? data.candidate.email : data.company.email,
        name: userType === 'candidate' 
          ? `${data.candidate.firstName} ${data.candidate.lastName}`
          : data.company.name,
        role: userType,
        location: userType === 'candidate' ? data.candidate.location : data.company.location,
      };

      // Store in state
      setToken(data.token);
      setUser(userData);

      // Store in localStorage
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(userData));

    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  };

  const isLoggedIn = !!user && !!token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoggedIn, 
      login, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Legacy employer auth for backward compatibility
interface EmployerAuthContextType {
  isEmployerLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const EmployerAuthContext = createContext<EmployerAuthContextType | undefined>(undefined);

export const EmployerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout: authLogout } = useAuth();
  
  const isEmployerLoggedIn = user?.role === 'employer';

  const login = () => {
    // This is a legacy demo login - in real usage, redirect to login page
    console.log("Please use the main login page");
  };

  const logout = () => {
    authLogout();
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