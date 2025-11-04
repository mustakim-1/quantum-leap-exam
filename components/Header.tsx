
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#0D1117]/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707M12 21v-1" />
            </svg>
            <h1 className="text-xl font-bold tracking-wider">QuantumLeap</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-blue-500/50" />
                   <div className="hidden sm:flex flex-col items-start">
                    <span className="font-medium leading-tight">{user.name}</span>
                    {user.role === 'student' && (
                        <span className="text-xs text-gray-400 leading-tight">{user.school} - Grade {user.grade}</span>
                    )}
                  </div>
                </div>
                <Button onClick={logout} variant="secondary" className="py-2 px-4 text-sm">Logout</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;