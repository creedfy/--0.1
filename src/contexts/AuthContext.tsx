import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Role } from '../types';

// 模拟用户数据
const mockUsers: User[] = [
  { id: 'dev1', username: 'developer', role: 'developer', password: 'devpassword' },
  { id: 'admin1', username: 'admin1', role: 'admin', password: 'adminpassword1' },
  { id: 'admin2', username: 'admin2', role: 'admin', password: 'adminpassword2' },
  { id: 'admin3', username: 'admin3', role: 'admin', password: 'adminpassword3' },
  { id: 'admin4', username: 'admin4', role: 'admin', password: 'adminpassword4' },
  { id: 'admin5', username: 'admin5', role: 'admin', password: 'adminpassword5' },
  { id: 'guest1', username: 'guest', role: 'guest', password: 'guestpassword' },
];

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (username: string, password: string): Promise<boolean> => {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAuthenticated = !!currentUser;

  const hasRole = (roles: Role[]): boolean => {
    return !!currentUser && roles.includes(currentUser.role);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, hasRole }}>
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