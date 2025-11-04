
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0D1117]';
  const variantClasses = variant === 'primary'
    ? 'bg-blue-500/20 border border-blue-400 text-blue-300 hover:bg-blue-500/30 hover:shadow-[0_0_15px_rgba(0,123,255,0.5)] focus:ring-blue-500'
    : 'bg-gray-500/20 border border-gray-400 text-gray-300 hover:bg-gray-500/30 hover:shadow-[0_0_15px_rgba(108,117,125,0.5)] focus:ring-gray-500';

  return (
    <button
      className={`backdrop-blur-sm ${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
