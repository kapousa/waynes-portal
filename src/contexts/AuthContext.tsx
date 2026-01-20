import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, getCurrentUser, isAuthenticated, AuthResponse, setToken, setCurrentUser } from '@/lib/api';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for testing without Strapi
const DEMO_USER = {
  id: 1,
  username: 'UAE Partner',
  email: 'partner@waynes.ae'
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const authenticated = isAuthenticated();
    if (authenticated) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Try actual Strapi login first
      const response = await apiLogin({ identifier: email, password });
      setUser(response.user);
      setIsLoggedIn(true);
    } catch (error) {
      // Fallback to demo mode if Strapi is not available
      // In production, remove this fallback
      console.log('Strapi unavailable, using demo mode');
      setToken('demo-token');
      setCurrentUser(DEMO_USER);
      setUser(DEMO_USER);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
