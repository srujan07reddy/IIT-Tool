import * as React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select(props: SelectProps) {
  return (
    <select
      {...props}
      style={{
        width: '100%',
        borderRadius: 14,
        border: '1px solid rgba(148, 163, 184, 0.28)',
        background: 'rgba(255, 255, 255, 0.78)',
        color: '#0f172a',
        padding: '0.85rem 1rem',
        fontSize: '0.95rem',
        ...(props.style ?? {}),
      }}
    />
  );
}
