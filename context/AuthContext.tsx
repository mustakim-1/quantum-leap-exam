
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string, password_insecure: string) => void;
  register: (name: string, email: string, password_insecure: string, school: string, grade: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password_insecure: string) => {
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser && foundUser.password_insecure === password_insecure) {
      setUser(foundUser);
    } else {
      alert('Invalid email or password.');
    }
  };

  const register = (name: string, email: string, password_insecure: string, school: string, grade: string) => {
    if (!name.trim() || !email.trim() || !password_insecure.trim() || !school.trim() || !grade.trim()) {
        alert("All fields are required.");
        return;
    }

    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
        alert("An account with this email already exists.");
        return;
    }

    const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        password_insecure,
        role: 'student',
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        school,
        grade,
    };
    MOCK_USERS.push(newUser);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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