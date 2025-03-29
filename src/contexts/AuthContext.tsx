import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { checkAuth, login as loginAction, logout as logoutAction } from '../store/slices/authSlice';
import type { RootState } from '../store';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize authentication state
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Redirect logic
  useEffect(() => {
    if (!loading) {
      // If user is not authenticated and not on login page, redirect to login
      if (!isAuthenticated && location.pathname !== '/login') {
        navigate('/login');
      }
      
      // If user is authenticated and on login page, redirect to users page
      if (isAuthenticated && location.pathname === '/login') {
        navigate('/users');
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      await dispatch(loginAction({ email, password })).unwrap();
      navigate('/users');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Logout function
  const logout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
