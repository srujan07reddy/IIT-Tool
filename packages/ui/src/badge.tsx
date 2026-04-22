import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'info' | 'success' | 'warning' | 'danger';
}

const tones: Record<NonNullable<BadgeProps['tone']>, React.CSSProperties> = {
  default: { background: 'rgba(255, 255, 255, 0.05)', color: '#A0A0A0', border: '1px solid rgba(255, 255, 255, 0.1)' },
  info: { background: 'rgba(0, 243, 255, 0.1)', color: '#00F3FF', border: '1px solid rgba(0, 243, 255, 0.3)' },
  success: { background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' },
  warning: { background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)' },
  danger: { background: 'rgba(255, 0, 229, 0.1)', color: '#FF00E5', border: '1px solid rgba(255, 0, 229, 0.3)' },
};

export function Badge({ children, tone = 'default', style, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 4,
        padding: '0.2rem 0.5rem',
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
