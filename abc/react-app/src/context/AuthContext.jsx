import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';

const AuthContext = createContext();

const ADMIN_EMAILS = [
  'sindiajoseph1986@gmail.com',
  'tharunkarthikav21@gmail.com',
  'admin@oviyaceramics.com'
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('oviya_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
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
          isAdmin
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
    const cleanEmail = email.trim().toLowerCase();

    // 1. Direct Local / Master Admin Credentials (Guaranteed offline & dev access)
    if (ADMIN_EMAILS.includes(cleanEmail) && (password === 'admin123' || password === 'oviya123')) {
      const userData = { 
        email: cleanEmail, 
        displayName: 'Oviya Ceramics Admin',
        role: 'admin', 
        isAdmin: true,
        loggedInAt: new Date().toISOString() 
      };
      setUser(userData);
      localStorage.setItem('oviya_admin_user', JSON.stringify(userData));
      return { success: true };
    }

    // 2. Firebase Cloud Auth
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = ADMIN_EMAILS.includes(cred.user.email?.toLowerCase());
      const userData = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || cred.user.email?.split('@')[0],
        role: isAdmin ? 'admin' : 'customer',
        isAdmin
      };
      setUser(userData);
      if (isAdmin) {
        localStorage.setItem('oviya_admin_user', JSON.stringify(userData));
      }
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.message || 'Invalid email or password. Please try again.' 
      };
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
        isAdmin
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
