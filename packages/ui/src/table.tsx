import * as React from 'react';

function mergeStyle(
  baseStyle: React.CSSProperties,
  style?: React.CSSProperties,
): React.CSSProperties {
  return { ...baseStyle, ...(style ?? {}) };
}

export function Table({ style, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      {...props}
      style={mergeStyle({ width: '100%', borderCollapse: 'collapse', color: '#e2e8f0' }, style)}
    />
  );
}

export function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}

export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({ style, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      style={mergeStyle({ borderBottom: '1px solid rgba(148, 163, 184, 0.14)' }, style)}
    />
  );
}

export function TableHead({ style, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      style={mergeStyle(
        {
          padding: '0.9rem 1rem',
          textAlign: 'left',
          fontSize: '0.78rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#94a3b8',
        },
        style,
      )}
    />
  );
}

export function TableCell({ style, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      style={mergeStyle({ padding: '1rem', fontSize: '0.95rem', verticalAlign: 'top' }, style)}
    />
  );
}
