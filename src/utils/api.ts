import { toast } from "sonner";

const URL = 'https://reqres.in/api';

// Custom fetch function with error handling and authentication
const fetchWithConfig = async (endpoint: string, options: RequestInit = {}) => {
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if it exists
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Merge options with defaults
  const config = {
    ...options,
    headers,
  };

  try {
    // Make the request
    const response = await fetch(`${URL}${endpoint}`, config);
    
    // Handle different status codes
    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        toast.error('Your session has expired. Please log in again.');
        throw new Error('Unauthorized');
      } else if (response.status >= 500) {
        toast.error('Server error. Please try again later.');
        throw new Error('Server error');
      } else if (response.status >= 400) {
        // We don't want to show error messages for 404s on user deletion
        if (!(response.status === 404 && options.method === 'DELETE')) {
          const data = await response.json().catch(() => ({}));
          const errorMessage = data?.error || 'An error occurred';
          toast.error(errorMessage);
        }
        throw new Error(response.statusText);
      }
    }
    
    // Parse JSON response
    const data = await response.json().catch(() => ({}));
    return { data, status: response.status, headers: response.headers };
  } catch (error) {
    // Network errors and other issues
    if (!error.message.includes('Unauthorized') && 
        !error.message.includes('Server error') && 
        !error.statusText) {
      toast.error('Network error. Please check your connection.');
    }
    throw error;
  }
};

// API functions for different HTTP methods
const api = {
  get: (endpoint: string, options = {}) => 
    fetchWithConfig(endpoint, { method: 'GET', ...options }),
  
  post: (endpoint: string, body: any, options = {}) => 
    fetchWithConfig(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(body),
      ...options 
    }),
  
  put: (endpoint: string, body: any, options = {}) => 
    fetchWithConfig(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(body),
      ...options 
    }),
  
  delete: (endpoint: string, options = {}) => 
    fetchWithConfig(endpoint, { method: 'DELETE', ...options }),
};

// Auth endpoints
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/login', { email, password }),
};

// User endpoints
export const userAPI = {
  getUsers: (page: number = 1) => 
    api.get(`/users?page=${page}`),
    
  getUserById: (id: number) => 
    api.get(`/users/${id}`),
    
  updateUser: (id: number, userData: any) => 
    api.put(`/users/${id}`, userData),
    
  deleteUser: (id: number) => 
    api.delete(`/users/${id}`),
};

export default api;
