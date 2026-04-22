'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variants: Record<NonNullable<ButtonProps['variant']>, any> = {
  primary: {
    background: 'linear-gradient(135deg, #00F3FF, #0072FF)',
    color: '#050505',
    border: '1px solid rgba(0, 243, 255, 0.45)',
    boxShadow: '0 0 20px rgba(0, 243, 255, 0.2)',
  },
  secondary: {
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#00F3FF',
    border: '1px solid rgba(0, 243, 255, 0.3)',
  },
  ghost: {
    background: 'transparent',
    color: '#E0E0E0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  danger: {
    background: 'linear-gradient(135deg, #FF00E5, #9100FF)',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 0, 229, 0.45)',
  },
  outline: {
    background: 'transparent',
    color: '#00F3FF',
    border: '1px solid #00F3FF',
  },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  variant = 'primary',
  size = 'md',
  whileHover,
  whileTap,
  ...props
}) => {
  return (
    <motion.button
      {...props}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        boxShadow: variant === 'primary' ? '0 0 30px rgba(0, 243, 255, 0.4)' : '0 10px 20px rgba(0,0,0,0.2)',
        ...((whileHover as any) || {})
      }}
      whileTap={{ scale: 0.98, ...((whileTap as any) || {}) }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        borderRadius: 8,
        padding: size === 'sm' ? '0.5rem 1rem' : size === 'lg' ? '1rem 2rem' : '0.8rem 1.4rem',
        fontSize: size === 'sm' ? '0.75rem' : size === 'lg' ? '1rem' : '0.875rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.65 : 1,
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
};
