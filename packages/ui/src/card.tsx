'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {}

export function Card({ children, style, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 30px 90px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 243, 255, 0.1)',
        borderColor: 'rgba(0, 243, 255, 0.3)'
      }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      {...props}
      style={{
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(12, 12, 12, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} style={{ padding: '1.25rem 1.5rem 0', ...style }}>
      {children}
    </div>
  );
}

export function CardContent({ children, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} style={{ padding: '1.25rem 1.5rem 1.5rem', ...style }}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      style={{
        margin: 0,
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#f8fafc',
        letterSpacing: '0.02em',
        ...style,
      }}
    >
      {children}
    </h3>
  );
}
