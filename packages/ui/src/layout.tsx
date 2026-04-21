import * as React from 'react';

export function PageContainer({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        width: 'min(1280px, calc(100vw - 48px))',
        margin: '0 auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Stack({
  children,
  gap = 16,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { gap?: number }) {
  return (
    <div {...props} style={{ display: 'grid', gap, ...style }}>
      {children}
    </div>
  );
}
