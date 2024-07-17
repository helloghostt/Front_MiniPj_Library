import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}) => {
  return (
    <button 
      className={`button ${variant} ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
};