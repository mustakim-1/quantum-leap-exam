
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-[#161B22]/80 border border-gray-700 rounded-xl shadow-lg shadow-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
