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

// Security configurations
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_TIME_MS = 5 * 60 * 1000; // 5 minutes lockout
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

  // Helper to check brute force lockout
  const checkLockout = () => {
    const lockUntil = localStorage.getItem('oviya_login_lockout');
    if (lockUntil) {
      const remainingMs = parseInt(lockUntil, 10) - Date.now();
      if (remainingMs > 0) {
        const remainingMinutes = Math.ceil(remainingMs / 60000);
        return `Security Lockout: Too many failed login attempts. Please wait ${remainingMinutes} minute(s) before trying again.`;
      } else {
        localStorage.removeItem('oviya_login_lockout');
        localStorage.removeItem('oviya_failed_attempts');
      }
    }
    return null;
  };

  // Helper to record failed attempts
  const recordFailedAttempt = () => {
    const attempts = parseInt(localStorage.getItem('oviya_failed_attempts') || '0', 10) + 1;
    localStorage.setItem('oviya_failed_attempts', attempts.toString());
    if (attempts >= MAX_FAILED_ATTEMPTS) {
      const lockUntil = Date.now() + LOCKOUT_TIME_MS;
      localStorage.setItem('oviya_login_lockout', lockUntil.toString());
      console.warn(`[Security Alert] 5 consecutive failed login attempts detected. Lockout initiated for 5 minutes.`);
    }
  };

  // Clear failed attempts on success
  const clearFailedAttempts = () => {
    localStorage.removeItem('oviya_failed_attempts');
    localStorage.removeItem('oviya_login_lockout');
  };

  const login = async (email, password) => {
    // 1. Check for brute force lockout
    const lockoutError = checkLockout();
    if (lockoutError) {
      return { success: false, message: lockoutError };
    }

    const cleanEmail = (email || '').trim().toLowerCase();

    // 2. Direct Local / Master Admin Credentials (Guaranteed offline & dev access)
    if (ADMIN_EMAILS.includes(cleanEmail) && (password === 'admin123' || password === 'oviya123')) {
      clearFailedAttempts();
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

    // 3. Firebase Cloud Auth
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      clearFailedAttempts();
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
      recordFailedAttempt();
      const attempts = parseInt(localStorage.getItem('oviya_failed_attempts') || '0', 10);
      const remaining = Math.max(0, MAX_FAILED_ATTEMPTS - attempts);
      const warning = remaining > 0 ? ` (${remaining} attempts remaining before temporary lockout)` : '';
      
      return { 
        success: false, 
        message: (err.message || 'Invalid email or password.') + warning 
      };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      clearFailedAttempts();
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
