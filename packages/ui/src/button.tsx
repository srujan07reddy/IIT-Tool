import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

const variants: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #2563eb, #0f766e)',
    color: '#f8fafc',
    border: '1px solid rgba(37, 99, 235, 0.45)',
  },
  secondary: {
    background: 'rgba(255, 255, 255, 0.72)',
    color: '#0f172a',
    border: '1px solid rgba(148, 163, 184, 0.45)',
  },
  ghost: {
    background: 'transparent',
    color: '#e2e8f0',
    border: '1px solid rgba(148, 163, 184, 0.28)',
  },
  danger: {
    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    color: '#fff1f2',
    border: '1px solid rgba(220, 38, 38, 0.45)',
  },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      {...props}
      style={{
        borderRadius: 14,
        padding: '0.8rem 1.1rem',
        fontSize: '0.95rem',
        fontWeight: 700,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.65 : 1,
        transition: 'transform 120ms ease, opacity 120ms ease',
        boxShadow: '0 18px 40px rgba(15, 23, 42, 0.16)',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};
