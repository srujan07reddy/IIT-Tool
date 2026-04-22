import * as React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export function Select({ onValueChange, ...props }: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative w-full">
      <select
        {...props}
        onChange={handleChange}
        style={{
          width: '100%',
          borderRadius: 14,
          border: '1px solid rgba(148, 163, 184, 0.28)',
          background: 'rgba(255, 255, 255, 0.78)',
          color: '#0f172a',
          padding: '0.85rem 1rem',
          fontSize: '0.95rem',
          appearance: 'none',
          ...(props.style ?? {}),
        }}
      />
    </div>
  );
}

export function SelectTrigger({ children, className, ...props }: any) {
  return <div className={className} {...props}>{children}</div>;
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children, className }: any) {
  return <div className={className}>{children}</div>;
}

export function SelectItem({ value, children, className }: any) {
  return <option value={value} className={className}>{children}</option>;
}
