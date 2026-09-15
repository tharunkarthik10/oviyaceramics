import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('oviya_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // Standard admin check
    if (email.toLowerCase() === 'tharunkarthikav21@gmail.com' && password === 'admin123') {
      const userData = { email, role: 'admin', loggedInAt: new Date().toISOString() };
      setUser(userData);
      localStorage.setItem('oviya_admin_user', JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid admin email or password. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oviya_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
