import React from 'react';

interface CalcButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function CalcButton({ onClick, children, className = '' }: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 text-white font-semibold rounded-lg transition-colors
        ${className || 'bg-gray-700 hover:bg-gray-800'}`}
    >
      {children}
    </button>
  );
}