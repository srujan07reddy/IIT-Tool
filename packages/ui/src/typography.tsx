import * as React from 'react';

export function Heading({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      style={{
        margin: 0,
        color: '#f8fafc',
        fontSize: 'clamp(1.35rem, 2vw, 2rem)',
        letterSpacing: '-0.03em',
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function Text({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      style={{
        margin: 0,
        color: '#cbd5e1',
        lineHeight: 1.65,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
