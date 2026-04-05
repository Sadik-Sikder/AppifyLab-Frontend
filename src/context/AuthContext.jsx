import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://appifylab-backend.onrender.com/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


  const register = async (formData) => {
    const res = await fetch("https://appifylab-backend.onrender.com/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      return data;
    } else {
      const err = await res.json();
      throw new Error(err.message || "Registration failed");
    }
  };

  const login = async (userData = null) => {
    if (userData) {
      setUser(userData);
    } else {
      const res = await fetch("https://appifylab-backend.onrender.com/api/auth/me", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
  };


  const logout = async () => {
    await fetch("https://appifylab-backend.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);