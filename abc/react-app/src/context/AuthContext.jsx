import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';

const AuthContext = createContext();

const ADMIN_EMAILS = [
  'tk21112006@gmail.com',
  'sindiajoseph1986@gmail.com',
];

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours max session age

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('oviya_admin_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        // Session timeout security check
        if (parsed.loggedInAt) {
          const sessionAge = Date.now() - new Date(parsed.loggedInAt).getTime();
          if (sessionAge > SESSION_MAX_AGE_MS) {
            localStorage.removeItem('oviya_admin_user');
            return null;
          }
        }
        return parsed;
      }
    } catch (e) {
      localStorage.removeItem('oviya_admin_user');
    }
    return null;
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = ADMIN_EMAILS.includes(firebaseUser.email?.toLowerCase());
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          photoURL: firebaseUser.photoURL,
          role: isAdmin ? 'admin' : 'customer',
          isAdmin,
          loggedInAt: new Date().toISOString()
        };
        setUser(userData);
        if (isAdmin) {
          localStorage.setItem('oviya_admin_user', JSON.stringify(userData));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();

    // Try Firebase Cloud Auth if credentials provided
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = ADMIN_EMAILS.includes(cred.user.email?.toLowerCase());
      const userData = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || cred.user.email?.split('@')[0],
        role: isAdmin ? 'admin' : 'customer',
        isAdmin,
        loggedInAt: new Date().toISOString()
      };
      setUser(userData);
      if (isAdmin) {
        localStorage.setItem('oviya_admin_user', JSON.stringify(userData));
      }
      return { success: true };
    } catch (err) {
      if (ADMIN_EMAILS.includes(cleanEmail)) {
        return {
          success: false,
          message: 'Incorrect password. Please try again or click "Forgot Password?" below to set a new password.'
        };
      }
      return {
        success: false,
        message: 'This email is not authorized as an administrator.'
      };
    }
  };

  const resetAdminPassword = async (email) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!ADMIN_EMAILS.includes(cleanEmail)) {
      return { success: false, message: 'This email is not registered as an authorized administrator.' };
    }
    
    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      return { success: true, message: 'Password reset email sent! Check your inbox to securely set a new password.' };
    } catch (err) {
      return { success: false, message: err.message || 'Failed to send password reset email.' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const isAdmin = ADMIN_EMAILS.includes(cred.user.email?.toLowerCase());
      const userData = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
        role: isAdmin ? 'admin' : 'customer',
        isAdmin,
        loggedInAt: new Date().toISOString()
      };
      setUser(userData);
      if (isAdmin) {
        localStorage.setItem('oviya_admin_user', JSON.stringify(userData));
      }
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Google sign in failed.' };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('oviya_admin_user');
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: !!user && (user.role === 'admin' || user.isAdmin === true),
        login,
        resetAdminPassword,
        loginWithGoogle,
        logout
      }}
    >
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
