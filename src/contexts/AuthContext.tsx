
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize authentication state
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        
        // Try to get user data from localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (error) {
            console.error('Failed to parse user data');
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

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
      setLoading(true);
      const response = await authAPI.login(email, password);
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        
        // Mock user data (since login endpoint doesn't return user details)
        const mockUserData = {
          email,
          name: 'User',
        };
        
        localStorage.setItem('userData', JSON.stringify(mockUserData));
        setUser(mockUserData);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        navigate('/users');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Logged out successfully");
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
