import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: email === 'admin@namavaraan.com' ? 'مدیر سیستم' : 'کاربر تست',
        email,
        role: email === 'admin@namavaraan.com' ? 'admin' : 'user',
        phone: '09123456789',
        address: 'تهران، ایران',
      };

      setAuthState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
      });
      return true;
    }

    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: 'user',
      phone: userData.phone,
      address: userData.address,
    };

    setAuthState({
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
    });
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;

    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null,
      isLoading: false,
    }));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}