import * as React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      style={{
        width: '100%',
        borderRadius: 14,
        border: '1px solid rgba(148, 163, 184, 0.28)',
        background: 'rgba(255, 255, 255, 0.78)',
        color: '#0f172a',
        padding: '0.85rem 1rem',
        fontSize: '0.95rem',
        minHeight: 120,
        ...(props.style ?? {}),
      }}
    />
  );
}
