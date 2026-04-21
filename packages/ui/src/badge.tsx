import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'info' | 'success' | 'warning' | 'danger';
}

const tones: Record<NonNullable<BadgeProps['tone']>, React.CSSProperties> = {
  default: { background: 'rgba(148, 163, 184, 0.18)', color: '#cbd5e1' },
  info: { background: 'rgba(59, 130, 246, 0.18)', color: '#bfdbfe' },
  success: { background: 'rgba(34, 197, 94, 0.18)', color: '#bbf7d0' },
  warning: { background: 'rgba(245, 158, 11, 0.18)', color: '#fde68a' },
  danger: { background: 'rgba(239, 68, 68, 0.18)', color: '#fecaca' },
};

export function Badge({ children, tone = 'default', style, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 999,
        padding: '0.35rem 0.7rem',
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
