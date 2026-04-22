import * as React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`}
      style={{
        display: 'block',
        marginBottom: '0.5rem',
        color: '#475569',
        fontSize: '0.875rem',
        fontWeight: 600,
        ...(props.style ?? {}),
      }}
    >
      {children}
    </label>
  );
}
