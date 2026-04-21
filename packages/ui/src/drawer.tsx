import * as React from 'react';

interface DrawerProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: number;
}

export function Drawer({ open, title, children, onClose, width = 460 }: DrawerProps) {
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
      <button
        aria-label="Close drawer overlay"
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          border: 0,
          background: 'rgba(15, 23, 42, 0.5)',
        }}
      />
      <aside
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width,
          maxWidth: '100%',
          height: '100%',
          background: '#0f172a',
          borderLeft: '1px solid rgba(148, 163, 184, 0.22)',
          padding: 24,
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <h3 style={{ margin: 0, color: '#f8fafc' }}>{title}</h3>
          <button onClick={onClose} style={closeButtonStyle}>
            Close
          </button>
        </div>
        <div style={{ marginTop: 20 }}>{children}</div>
      </aside>
    </div>
  );
}

const closeButtonStyle: React.CSSProperties = {
  borderRadius: 10,
  border: '1px solid rgba(148, 163, 184, 0.24)',
  background: 'transparent',
  color: '#e2e8f0',
  padding: '0.55rem 0.75rem',
  cursor: 'pointer',
};
