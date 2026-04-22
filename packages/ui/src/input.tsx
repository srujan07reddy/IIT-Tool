import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:border-[#00F3FF] focus:ring-1 focus:ring-[#00F3FF]/30 placeholder:text-white/20 ${className || ''}`}
    />
  );
};
