
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#0D1B2A]/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src="/image/Adobe Express - file.png" alt="SULPHURIC BENCH Logo" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-bold tracking-wider">SULPHURIC BENCH</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-[#415A77]/50" />
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