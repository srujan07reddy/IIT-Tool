import * as React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ children, style, ...props }: CardProps) {
  return (
    <div
      {...props}
      style={{
        borderRadius: 24,
        border: '1px solid rgba(148, 163, 184, 0.18)',
        background: 'rgba(15, 23, 42, 0.72)',
        boxShadow: '0 24px 60px rgba(15, 23, 42, 0.16)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, style, ...props }: CardProps) {
  return (
    <div {...props} style={{ padding: '1.25rem 1.5rem 0', ...style }}>
      {children}
    </div>
  );
}

export function CardContent({ children, style, ...props }: CardProps) {
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
        ...style,
      }}
    >
      {children}
    </h3>
  );
}
